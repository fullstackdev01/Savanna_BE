import StatusCodes from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import jwtUtil from '../shared/jwt';
// Constants
const { UNAUTHORIZED } = StatusCodes;
const jwtNotPresentErr = 'JWT not present in signed cookie.';
/**
 * Middleware to verify if user is an admin.
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
export async function authMw (req: Request, res: Response, next: NextFunction) {
  try {
    // Get json-web-token
    const jwt = req.headers['authorization'];
    if (!jwt) {
      throw Error(jwtNotPresentErr);
      }
    const token = jwt.split(" ")[1];
    // Make sure user is authorized
    const clientData = await jwtUtil.decode(token);
    if (!!clientData) {
      //@ts-ignore
      req.user = clientData;
      next();
    } else {
      throw Error(jwtNotPresentErr);
    }
  } catch (err) {
    return res.status(UNAUTHORIZED).json({
      error: err.message,
    });
  }
};