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
const nft_model_1 = __importDefault(require("../models/nft-model"));
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Get one user.
 *
 * @param match
 * @returns
 */
function getOne(match) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield nft_model_1.default.findOne(Object.assign(Object.assign({}, match), { is_active: true, is_deleted: false }));
    });
}
/**
 * Get all users.
 *
 * @returns
 */
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield nft_model_1.default.find({
            is_active: true,
            is_deleted: false
        });
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
        return yield nft_model_1.default.create(user);
    });
}
/**
 * Update a record.
 *
 * @param user
 * @returns
 */
function update(_id, obj) {
    return __awaiter(this, void 0, void 0, function* () {
        const modified = yield nft_model_1.default.findByIdAndUpdate(new mongoose_1.default.Types.ObjectId(_id), {
            $set: obj
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
        return yield update(id, {
            is_deleted: true
        });
    });
}
// Export default
exports.default = {
    getOne,
    getAll,
    add,
    update,
    delete: deleteOne,
};
