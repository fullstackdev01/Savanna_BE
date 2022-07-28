import AWS from "aws-sdk";
AWS.config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-west-2",
  signatureVersion: "v4",
});

const s3 = new AWS.S3();

export default ({ bucket, key, expires }: any) => {
  const signedUrl = s3.getSignedUrl("putObject", {
    Key: key,
    Bucket: bucket,
    Expires: expires || (5 * 60), // S3 default is 900 seconds (15 minutes)
  });

  return signedUrl;
};