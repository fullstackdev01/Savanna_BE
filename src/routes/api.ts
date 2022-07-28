import { Router } from 'express';
import userRouter from './user-router';
import nftRouter from './nft-router';
import authRouter from './auth-router';
import { authMw } from '../shared/guard';

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/users', authMw, userRouter);
baseRouter.use('/auth', authRouter);
baseRouter.use('/nft', authMw, nftRouter);


// Export default.
export default baseRouter;
