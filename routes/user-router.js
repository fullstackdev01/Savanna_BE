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
exports.p = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const express_1 = require("express");
const errors_1 = require("../shared/errors");
const user_service_1 = __importDefault(require("../services/user-service"));
const user_repo_1 = __importDefault(require("../repos/user-repo"));
const mongoose_1 = __importDefault(require("mongoose"));
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = http_status_codes_1.default;
// Paths
exports.p = {
    get: '/all',
    getOne: '/',
    add: '/add',
};
/**
 * Get one user.
 */
router.get(exports.p.getOne, (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // @ts-ignore
    const user = (_a = _ === null || _ === void 0 ? void 0 : _.user) === null || _a === void 0 ? void 0 : _a._id;
    const users = yield user_repo_1.default.getOne({
        _id: new mongoose_1.default.Types.ObjectId(user)
    });
    return res.status(OK).json({
        data: {
            users
        }, error: false, msg: "User"
    });
}));
/**
 * Get all users.
 */
router.get(exports.p.get, (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_service_1.default.getAll();
    return res.status(OK).json({ data: users, error: false, msg: "User" });
}));
/**
 * Add one user.
 */
router.post(exports.p.add, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    // Check param
    if (!user) {
        throw new errors_1.ParamMissingError();
    }
    // Fetch data
    yield user_service_1.default.addOne(user);
    return res.status(CREATED).end();
}));
// Export default
exports.default = router;
