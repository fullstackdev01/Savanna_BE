"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    nft_name: { type: String },
    image: { type: String },
    type: { type: String },
    rank: { type: String },
    state: { type: String },
    quantity: { type: String },
    bronze_uri: { type: String },
    silver_uri: { type: String },
    gold_uri: { type: String },
    claim_uri: { type: String },
    is_active: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false }
}, {
    timestamps: true
});
const NFTModel = (0, mongoose_1.model)('NFT', schema);
exports.default = NFTModel;
