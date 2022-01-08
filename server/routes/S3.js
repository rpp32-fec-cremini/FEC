var aws = require('aws-sdk');
var dotenv = require('dotenv');
var fs = require('fs');


dotenv.config()

var region = "us-west-1";
var bucketName = "fec-images";
var accessKeyId = process.env.AWS_ACCESSKEY;
var secretAccessKey = process.env.AWS_SECRETACCESSKEY;

var s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  // signatureVersion: 'v4'
})

// uploads a file to s3
var uploadFile = function(file) {
  var fileStream = fs.createReadStream(file.path)
  var uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
    ContentType: 'image/jpeg'
  }

  return s3.upload(uploadParams).promise()
}

//downloads a file from s3

module.exports.uploadFile = uploadFile;