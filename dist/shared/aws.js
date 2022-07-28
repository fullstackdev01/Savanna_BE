"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config = new aws_sdk_1.default.Config({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-west-2",
    signatureVersion: "v4",
});
const s3 = new aws_sdk_1.default.S3();
exports.default = ({ bucket, key, expires }) => {
    const signedUrl = s3.getSignedUrl("putObject", {
        Key: key,
        Bucket: bucket,
        Expires: expires || (5 * 60), // S3 default is 900 seconds (15 minutes)
    });
    return signedUrl;
};
