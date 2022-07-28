import userRepo from '../repos/user-repo';
import { IUserModel } from '../models/user-model';



/**
 * Login.
 * 
 * @returns 
 */
async function login(obj: Partial<IUserModel>): Promise<IUserModel | null> {
    return userRepo.getOne(obj);
}

async function signup(obj: IUserModel): Promise<IUserModel | null> {
    return userRepo.add(obj);
}

// Export default
export default {
    login,
    signup
} as const;
