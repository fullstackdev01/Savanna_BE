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
const nft_service_1 = __importDefault(require("../services/nft-service"));
const nft_repo_1 = __importDefault(require("../repos/nft-repo"));
const mongoose_1 = __importDefault(require("mongoose"));
const nft_assignee_1 = __importDefault(require("../repos/nft-assignee"));
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = http_status_codes_1.default;
// Paths
exports.p = {
    get: '/all',
    getOne: '/',
    add: '/add',
    update: '/:id/update',
    assigneeNft: '/assignee/:id',
    getAssignee: '/assignee/:id'
};
/**
 * Get one user.
 */
router.get(exports.p.getOne, (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // @ts-ignore
    const user = (_a = _ === null || _ === void 0 ? void 0 : _.user) === null || _a === void 0 ? void 0 : _a._id;
    const users = yield nft_repo_1.default.getOne({
        _id: new mongoose_1.default.Types.ObjectId(user)
    });
    return res.status(OK).json({
        data: {
            users
        }, error: false, msg: "NFT"
    });
}));
/**
 * Get all users.
 */
router.get(exports.p.get, (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nfts = yield nft_service_1.default.getAll();
    return res.status(OK).json({ data: nfts, error: false, msg: "Nfts" });
}));
/**
 * Add one user.
 */
router.post(exports.p.add, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nft_name, image, type, rank, state, quantity, bronze_uri, silver_uri, gold_uri, claim_uri } = req.body;
    // Check param
    if (!nft_name || !image || !type || !rank || !state || !quantity || !bronze_uri || !silver_uri || !gold_uri) {
        throw new errors_1.ParamMissingError();
    }
    // Fetch data
    yield nft_service_1.default.addOne({
        nft_name,
        image,
        type,
        rank,
        state,
        quantity,
        bronze_uri,
        silver_uri,
        gold_uri,
        claim_uri
    });
    return res.status(CREATED).end();
}));
router.post(exports.p.update, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nft_name, image, type, rank, state, quantity, bronze_uri, silver_uri, gold_uri, claim_uri } = req.body;
    // Fetch data
    yield nft_service_1.default.update(id, {
        nft_name,
        image,
        type,
        rank,
        state,
        quantity,
        bronze_uri,
        silver_uri,
        gold_uri,
        claim_uri
    });
    return res.status(CREATED).end();
}));
router.post(exports.p.assigneeNft, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { assignee } = req.body;
    // Fetch data
    const arr = assignee.split(',');
    for (let wallet_address of arr) {
        yield nft_assignee_1.default.add({
            nft_id: id,
            assignee_wallet_address: wallet_address
        });
    }
    return res.status(CREATED).end();
}));
router.get(exports.p.assigneeNft, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Fetch data
    const result = yield nft_assignee_1.default.findAll({
        nft_id: new mongoose_1.default.Types.ObjectId(id),
    });
    if (result) {
        return res.status(OK).json({
            error: false,
            msg: "Success",
            data: result
        }).end();
    }
    return res.status(BAD_REQUEST).end();
}));
// Export default
exports.default = router;
