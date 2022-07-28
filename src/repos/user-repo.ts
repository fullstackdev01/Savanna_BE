import UsersModel, { IUserModel } from '../models/user-model';
import mongoose from 'mongoose';

/**
 * Get one user.
 * 
 * @param match 
 * @returns 
 */
async function getOne(match: Partial<IUserModel>): Promise<IUserModel | null> {
    return await UsersModel.findOne({
        ...match,
        is_active: true,
        is_deleted: false
    })
}


/**
 * See if a user with the given phone exists.
 * 
 * @param phone 
 */
async function persists(username: string): Promise<IUserModel | null> {
    return await UsersModel.findOne({
        username: username,
    });
}


/**
 * Get all users.
 * 
 * @returns 
 */
async function getAll(): Promise<IUserModel[]> {
    return await UsersModel.aggregate([
        {
            $match: {
                is_active: true,
                is_deleted: false
            }
        },
        {
            $lookup: {
                from: "rates",
                let: {
                    user_id: '$_id'
                },
                pipeline: [
                    {
                        $match: {
                            $and: [
                                {
                                    $expr: {
                                        $eq: ["$nft_of_user", "$$user_id"]
                                    }
                                },
                                {
                                    $expr: {
                                        $eq: ["$is_active", true]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $group:{
                            _id: "$nft_of_user",
                            avg_rate: { $avg: "$rate" }
                        }
                    },
                ],
                as: "rates"
            }
        },
        {
            $unwind: { path: "$rates", preserveNullAndEmptyArrays: true },
        },
        {
            $project: {
                _id: 1,
                name: 1,
                email: 1,
                uuid: 1,
                country_code: 1,
                mobile: 1,
                bio: 1,
                image:1,
                is_active: 1,
                is_deleted: 1,
                createdAt: 1,
                updatedAt: 1,
                avg_rate: '$rates.avg_rate'
            }
        },
        {
            $sort: {
                avg_rate: -1
            }
        },
        {
            $limit: 20
        }
    ]).exec();
}


/**
 * Add one user.
 * 
 * @param user 
 * @returns 
 */
async function add(user: IUserModel): Promise<IUserModel> {
    return await UsersModel.create(user);
}


/**
 * Update a user.
 * 
 * @param user 
 * @returns 
 */
async function update(_id: string, user: IUserModel): Promise<IUserModel | null> {
    const modified =  await UsersModel.findByIdAndUpdate(new mongoose.Types.ObjectId(_id), {
        $set: user
    });
    return modified;
}


/**
 * Delete one user.
 * 
 * @param id 
 * @returns 
 */
async function deleteOne(id: number): Promise<void> {

}


// Export default
export default {
    getOne,
    persists,
    getAll,
    add,
    update,
    delete: deleteOne,
} as const;
