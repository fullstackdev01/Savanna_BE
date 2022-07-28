import NFTAssigneeModel, { INFTAssigneeModel } from '../models/nft-assignees';


/**
 * Add one user.
 * 
 * @param user 
 * @returns 
 */
async function add(user: INFTAssigneeModel): Promise<INFTAssigneeModel> {
    return await NFTAssigneeModel.create(user);
}

/**
 * GET user.
 * 
 * @param user 
 * @returns 
 */
 async function findAll(match: Partial<INFTAssigneeModel>): Promise<INFTAssigneeModel[]> {
    return await NFTAssigneeModel.find(match);
}


// Export default
export default {
    add,
    findAll,
} as const;
