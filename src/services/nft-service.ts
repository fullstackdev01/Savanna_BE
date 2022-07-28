import nftRepo from '../repos/nft-repo';
import { INFTModel } from '../models/nft-model';



/**
 * Get all users.
 * 
 * @returns 
 */
function getAll(): Promise<INFTModel[]> {
    return nftRepo.getAll();
}


/**
 * Add one user.
 * 
 * @param user 
 * @returns 
 */
function addOne(obj: INFTModel): Promise<INFTModel> {
    return nftRepo.add(obj);
}

/**
 * Update
 * 
 * @param user 
 * @returns 
 */
function update(_id: string, obj: INFTModel): Promise<INFTModel | null> {
    return nftRepo.update(_id, obj);
}

// Export default
export default {
    getAll,
    addOne,
    update,
} as const;
