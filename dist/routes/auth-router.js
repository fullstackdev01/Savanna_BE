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
const auth_service_1 = __importDefault(require("../services/auth-service"));
const errors_1 = require("../shared/errors");
const user_repo_1 = __importDefault(require("../repos/user-repo"));
const jwt_1 = __importDefault(require("../shared/jwt"));
const crypto_1 = require("../shared/crypto");
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK, BAD_REQUEST, UNAUTHORIZED } = http_status_codes_1.default;
// Paths
exports.p = {
    login: '/login',
    signup: '/signup'
};
/**
 * Login.
 */
router.post(exports.p.login, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { username, password } = req.body;
    // Check param
    if (!username || !password) {
        throw new errors_1.ParamMissingError();
    }
    // Fetch data
    const result = yield auth_service_1.default.login({
        username
    });
    if (result && (yield !(0, crypto_1.checkPassword)(password, (_a = result === null || result === void 0 ? void 0 : result.password) !== null && _a !== void 0 ? _a : ""))) {
        return res.status(UNAUTHORIZED).json({
            error: true,
            msg: "User password not valid",
            data: null,
        }).end();
    }
    if (result && (yield (0, crypto_1.checkPassword)(password, (_b = result === null || result === void 0 ? void 0 : result.password) !== null && _b !== void 0 ? _b : ""))) {
        const token = yield jwt_1.default.sign({
            username: result.username,
            _id: (_c = result._id) === null || _c === void 0 ? void 0 : _c.toString()
        });
        return res.status(OK).json({
            error: false,
            msg: "User logged in",
            data: result,
            token: token
        }).end();
    }
    else {
        return res.status(BAD_REQUEST).json({
            error: true,
            msg: "Username is invalid",
            data: null
        }).end();
    }
}));
/**
 * Signup.
 */
router.post(exports.p.signup, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { username, password } = req.body;
    // Check param
    if (!username || !password) {
        throw new errors_1.ParamMissingError();
    }
    const found = yield user_repo_1.default.persists(username);
    if (found) {
        return res.status(BAD_REQUEST).json({
            error: true,
            msg: "Username already preset",
            data: null
        }).end();
    }
    else {
        // Fetch data
        const result = yield auth_service_1.default.signup({
            username,
            password: yield (0, crypto_1.hashPassword)(password)
        });
        if (result) {
            const token = yield jwt_1.default.sign({
                username: result.username,
                _id: (_d = result._id) === null || _d === void 0 ? void 0 : _d.toString()
            });
            return res.status(OK).json({
                error: false,
                msg: "User logged in",
                data: result,
                token: token
            }).end();
        }
        else {
            return res.status(BAD_REQUEST).json({
                error: true,
                msg: "User creation failed",
                data: null
            }).end();
        }
    }
}));
// Export default
exports.default = router;
