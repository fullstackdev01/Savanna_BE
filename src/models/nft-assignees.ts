import mongoose, { model, Schema } from "mongoose";

//state CLAIMED, UNCLAIMED
//rank BRONZE, SILVER, GOLD
//type PUBLIC, MEDIA

// NFT schema
export interface INFTAssigneeModel {
    _id?: mongoose.Types.ObjectId;
    nft_id?: mongoose.Types.ObjectId | string;
    assignee_wallet_address: string;
    is_active?: boolean;
    is_deleted?: boolean;
}

const schema = new Schema<INFTAssigneeModel>(
    {
        nft_id: { type: mongoose.Types.ObjectId },
        assignee_wallet_address: { type: String },
        is_active: { type: Boolean, default: true },
        is_deleted: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

const NFTAssigneeModel = model('NFTAssignee', schema);
export default NFTAssigneeModel;
