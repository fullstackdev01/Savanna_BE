"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    username: { type: String },
    password: { type: String },
    is_active: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false }
}, {
    timestamps: true
});
const UsersModel = (0, mongoose_1.model)('Users', schema);
exports.default = UsersModel;
