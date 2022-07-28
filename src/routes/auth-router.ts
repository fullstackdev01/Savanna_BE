import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import authService from '../services/auth-service';
import { ParamMissingError } from '../shared/errors';
import userRepo from '../repos/user-repo';
import jwt from '../shared/jwt';
import { checkPassword, hashPassword } from '../shared/crypto';



// Constants
const router = Router();
const { CREATED, OK, BAD_REQUEST, UNAUTHORIZED } = StatusCodes;

// Paths
export const p = {
    login: '/login',
    signup: '/signup'
} as const;

/**
 * Login.
 */
router.post(p.login, async (req: Request, res: Response) => {
    const { username, password } = req.body;
    // Check param
    if (!username || !password) {
        throw new ParamMissingError();
    }
    // Fetch data
    const result = await authService.login({
        username
    });
    if (result && await !checkPassword(password, result?.password ?? "")) {
        return res.status(UNAUTHORIZED).json({
            error: true,
            msg: "User password not valid",
            data: null,
        }).end();
    }
    if (result && await checkPassword(password, result?.password ?? "")) {
        const token = await jwt.sign({
            username: result.username,
            _id: result._id?.toString()
        });
        return res.status(OK).json({
            error: false,
            msg: "User logged in",
            data: result,
            token: token
        }).end();
    } else {
        return res.status(BAD_REQUEST).json({
            error: true,
            msg: "Username is invalid",
            data: null
        }).end();
    }
});

/**
 * Signup.
 */
router.post(p.signup, async (req: Request, res: Response) => {
    const { username, password } = req.body;
    // Check param
    if (!username || !password) {
        throw new ParamMissingError();
    }
    const found = await userRepo.persists(username);
    if (found) {
        return res.status(BAD_REQUEST).json({
            error: true,
            msg: "Username already preset",
            data: null
        }).end();
    } else {
        // Fetch data
        const result = await authService.signup({
           username,
           password: await hashPassword(password)
        });
        if (result) {
            const token = await jwt.sign({
                username: result.username,
                _id: result._id?.toString()
            });
            return res.status(OK).json({
                error: false,
                msg: "User logged in",
                data: result,
                token: token
            }).end();
        } else {
            return res.status(BAD_REQUEST).json({
                error: true,
                msg: "User creation failed",
                data: null
            }).end();
        }
    }
});

// Export default
export default router;
