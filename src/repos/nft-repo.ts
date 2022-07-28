import NFTModel, { INFTModel } from '../models/nft-model';
import mongoose from 'mongoose';

/**
 * Get one user.
 * 
 * @param match 
 * @returns 
 */
async function getOne(match: Partial<INFTModel>): Promise<INFTModel | null> {
    return await NFTModel.findOne({
        ...match,
        is_active: true,
        is_deleted: false
    })
}

/**
 * Get all users.
 * 
 * @returns 
 */
async function getAll(): Promise<INFTModel[]> {
    return await NFTModel.find({
        is_active: true,
        is_deleted: false
    });
}


/**
 * Add one user.
 * 
 * @param user 
 * @returns 
 */
async function add(user: INFTModel): Promise<INFTModel> {
    return await NFTModel.create(user);
}


/**
 * Update a record.
 * 
 * @param user 
 * @returns 
 */
async function update(_id: string, obj: Partial<INFTModel>): Promise<INFTModel | null> {
    const modified =  await NFTModel.findByIdAndUpdate(new mongoose.Types.ObjectId(_id), {
        $set: obj
    });
    return modified;
}


/**
 * Delete one user.
 * 
 * @param id 
 * @returns 
 */
async function deleteOne(id: string): Promise<INFTModel | null> {
    return await update(id, {
        is_deleted: true
    });
}


// Export default
export default {
    getOne,
    getAll,
    add,
    update,
    delete: deleteOne,
} as const;
