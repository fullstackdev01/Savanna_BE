"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repo_1 = __importDefault(require("../repos/user-repo"));
/**
 * Get all users.
 *
 * @returns
 */
function getAll() {
    return user_repo_1.default.getAll();
}
/**
 * Add one user.
 *
 * @param user
 * @returns
 */
function addOne(user) {
    return user_repo_1.default.add(user);
}
/**
 * Update
 *
 * @param user
 * @returns
 */
function update(_id, user) {
    return user_repo_1.default.update(_id, user);
}
// Export default
exports.default = {
    getAll,
    addOne,
    update,
};
