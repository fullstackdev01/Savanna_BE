import mongoose, { model, Schema } from "mongoose";

//state CLAIMED, UNCLAIMED
//rank BRONZE, SILVER, GOLD
//type PUBLIC, MEDIA

// NFT schema
export interface INFTModel {
    _id?: mongoose.Types.ObjectId;
    nft_name: string;
    image?: string;
    type: string;
    rank: string;
    state: string;
    quantity: string;
    bronze_uri?: string;
    silver_uri?: string;
    gold_uri?: string;
    claim_uri?: string;
    media_uri?: string;
    is_active?: boolean;
    is_deleted?: boolean;
}

const schema = new Schema<INFTModel>(
    {
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
        media_uri: { type: String },
        is_active: { type: Boolean, default: true },
        is_deleted: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

const NFTModel = model('NFT', schema);
export default NFTModel;
