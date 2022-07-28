import userRepo from '../repos/user-repo';
import { IUserModel } from '../models/user-model';



/**
 * Get all users.
 * 
 * @returns 
 */
function getAll(): Promise<IUserModel[]> {
    return userRepo.getAll();
}


/**
 * Add one user.
 * 
 * @param user 
 * @returns 
 */
function addOne(user: IUserModel): Promise<IUserModel> {
    return userRepo.add(user);
}

/**
 * Update
 * 
 * @param user 
 * @returns 
 */
function update(_id: string, user: IUserModel): Promise<IUserModel | null> {
    return userRepo.update(_id, user);
}

// Export default
export default {
    getAll,
    addOne,
    update,
} as const;
