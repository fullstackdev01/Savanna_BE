import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { ParamMissingError } from '../shared/errors';
import nftService from '../services/nft-service';
import nftRepo from '../repos/nft-repo';
import mongoose from 'mongoose';
import nftAssignee from '../repos/nft-assignee';



// Constants
const router = Router();
const { CREATED, OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = StatusCodes;

// Paths
export const p = {
    get: '/all',
    getOne: '/',
    add: '/add',
    update: '/:id/update',
    assigneeNft: '/assignee/:id',
    getAssignee: '/assignee/:id'
} as const;


/**
 * Get one user.
 */
router.get(p.getOne, async (_: Request, res: Response) => {
    // @ts-ignore
    const user = _?.user?._id;
    const users = await nftRepo.getOne({
        _id: new mongoose.Types.ObjectId(user)
    });
    return res.status(OK).json({
        data: {
            users
        }, error: false, msg: "NFT"
    });
});

/**
 * Get all users.
 */
router.get(p.get, async (_: Request, res: Response) => {
    const nfts = await nftService.getAll();
    return res.status(OK).json({ data: nfts, error: false, msg: "Nfts" });
});


/**
 * Add one user.
 */
router.post(p.add, async (req: Request, res: Response) => {
    const { nft_name, image, type, rank, state, quantity, bronze_uri, silver_uri, gold_uri, claim_uri, media_uri } = req.body;
    // Check param
    if (!nft_name || !image || !type || !rank || !state || !quantity) {
        throw new ParamMissingError();
    }
    // Fetch data
    await nftService.addOne({
        nft_name,
        image,
        type,
        rank,
        state,
        quantity,
        bronze_uri,
        silver_uri,
        gold_uri,
        claim_uri,
        media_uri
    });
    return res.status(CREATED).end();
});

router.post(p.update, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nft_name, image, type, rank, state, quantity, bronze_uri, silver_uri, gold_uri, claim_uri, media_uri } = req.body;
    // Fetch data
    await nftService.update(id, {
        nft_name,
        image,
        type,
        rank,
        state,
        quantity,
        bronze_uri,
        silver_uri,
        gold_uri,
        claim_uri,
        media_uri
    });
    return res.status(CREATED).end();
});

router.post(p.assigneeNft, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { assignee } = req.body;
    // Fetch data
    const arr = assignee.split(',');
    for (let wallet_address of arr) {
        await nftAssignee.add({
            nft_id: id,
            assignee_wallet_address: wallet_address
        });
    }
    return res.status(CREATED).end();
});

router.get(p.assigneeNft, async (req: Request, res: Response) => {
    const { id } = req.params;
    // Fetch data
    const result = await nftAssignee.findAll({
        nft_id: new mongoose.Types.ObjectId(id),
    });
    if (result) {
        return res.status(OK).json({
            error: false,
            msg: "Success",
            data: result
        }).end();
    }
    return res.status(BAD_REQUEST).end();
});

// Export default
export default router;
