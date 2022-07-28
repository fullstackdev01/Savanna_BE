"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user-model"));
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Get one user.
 *
 * @param match
 * @returns
 */
function getOne(match) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_model_1.default.findOne(Object.assign(Object.assign({}, match), { is_active: true, is_deleted: false }));
    });
}
/**
 * See if a user with the given phone exists.
 *
 * @param phone
 */
function persists(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_model_1.default.findOne({
            username: username,
        });
    });
}
/**
 * Get all users.
 *
 * @returns
 */
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_model_1.default.aggregate([
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
                            $group: {
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
                    image: 1,
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
    });
}
/**
 * Add one user.
 *
 * @param user
 * @returns
 */
function add(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_model_1.default.create(user);
    });
}
/**
 * Update a user.
 *
 * @param user
 * @returns
 */
function update(_id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const modified = yield user_model_1.default.findByIdAndUpdate(new mongoose_1.default.Types.ObjectId(_id), {
            $set: user
        });
        return modified;
    });
}
/**
 * Delete one user.
 *
 * @param id
 * @returns
 */
function deleteOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
// Export default
exports.default = {
    getOne,
    persists,
    getAll,
    add,
    update,
    delete: deleteOne,
};
