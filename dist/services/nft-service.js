"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nft_repo_1 = __importDefault(require("../repos/nft-repo"));
/**
 * Get all users.
 *
 * @returns
 */
function getAll() {
    return nft_repo_1.default.getAll();
}
/**
 * Add one user.
 *
 * @param user
 * @returns
 */
function addOne(obj) {
    return nft_repo_1.default.add(obj);
}
/**
 * Update
 *
 * @param user
 * @returns
 */
function update(_id, obj) {
    return nft_repo_1.default.update(_id, obj);
}
// Export default
exports.default = {
    getAll,
    addOne,
    update,
};
