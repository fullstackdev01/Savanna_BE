import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { ParamMissingError } from '../shared/errors';
import userService from '../services/user-service';
import userRepo from '../repos/user-repo';
import mongoose from 'mongoose';



// Constants
const router = Router();
const { CREATED, OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = StatusCodes;

// Paths
export const p = {
    get: '/all',
    getOne: '/',
    add: '/add',
} as const;


/**
 * Get one user.
 */
router.get(p.getOne, async (_: Request, res: Response) => {
    // @ts-ignore
    const user = _?.user?._id;
    const users = await userRepo.getOne({
        _id: new mongoose.Types.ObjectId(user)
    });
    return res.status(OK).json({
        data: {
            users
        }, error: false, msg: "User"
    });
});

/**
 * Get all users.
 */
router.get(p.get, async (_: Request, res: Response) => {
    const users = await userService.getAll();
    return res.status(OK).json({ data: users, error: false, msg: "User" });
});


/**
 * Add one user.
 */
router.post(p.add, async (req: Request, res: Response) => {
    const { user } = req.body;
    // Check param
    if (!user) {
        throw new ParamMissingError();
    }
    // Fetch data
    await userService.addOne(user);
    return res.status(CREATED).end();
});

// Export default
export default router;
