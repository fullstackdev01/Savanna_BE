"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_1 = __importDefault(require("./user-router"));
const nft_router_1 = __importDefault(require("./nft-router"));
const auth_router_1 = __importDefault(require("./auth-router"));
const guard_1 = require("../shared/guard");
// Export the base-router
const baseRouter = (0, express_1.Router)();
// Setup routers
baseRouter.use('/users', guard_1.authMw, user_router_1.default);
baseRouter.use('/auth', auth_router_1.default);
baseRouter.use('/nft', guard_1.authMw, nft_router_1.default);
// Export default.
exports.default = baseRouter;
