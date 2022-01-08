var aws = require('aws-sdk');
var dotenv = require('dotenv');
var crypto = require('crypto');
var {promisify} = require("util");
var randomBytes = promisify(crypto.randomBytes)


dotenv.config()

var region = "us-west-1";
var bucketName = "fec-images";
var accessKeyId = process.env.AWS_ACCESSKEY;
var secretAccessKey = process.env.AWS_SECRETACCESSKEY;

var s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

async function generateUploadURL() {
  var rawBytes = await randomBytes(16);
  var imageName = rawBytes.toString('hex');

  var params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })

  var uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL
}

module.exports = generateUploadURL;