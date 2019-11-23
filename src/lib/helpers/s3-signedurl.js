const AWS = require("aws-sdk");

const s3 = new AWS.S3();
/*AWS.config.update({
    region: "us-east-1",
    credentials: {
        accessKeyId: "AKIA2O5IMV72G7C744GW",
        secretAccessKey: "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"
    }
});*/

const myBucket = "01-bucketest";
const mykey = "file-name.pdf";
const signedUrlExpireSeconds = 60 * 3;
// const region = 'us-east-1';

module.exports = ({ filename, extension, id }) => {
    // const url = s3.getSignedUrl("putObject", {
    //     Bucket: myBucket,
    //     Key: `images/${filename}-${id}.${extension}`, // file name with extension
    //     Expires: 60 * 2,
    // });

    const url = s3.createPresignedPost({
        Bucket: myBucket,
        //  Key: `images/${filename}-${id}.${extension}`, // file name with extension
        Expires: 60,
        Conditions: [
            ["starts-with", "$Content-Type", "image/"],
            ["starts-with", "$key", "images/"]
        ]
    });
    return url;
};
