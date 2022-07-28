import mongoose, { model, Schema } from "mongoose";

// User schema
export interface IUserModel {
    _id?: mongoose.Types.ObjectId;
    username: string;
    password: string;
    is_active?: boolean;
    is_deleted?: boolean;
}

const schema = new Schema<IUserModel>(
    {
        username: { type: String },
        password: { type: String },
        is_active: { type: Boolean, default: true },
        is_deleted: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

const UsersModel = model('Users', schema);
export default UsersModel;
