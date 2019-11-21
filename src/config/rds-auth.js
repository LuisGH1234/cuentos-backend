const AWS = require("aws-sdk");

function authRds(obj) {
    try {
        const signer = new AWS.RDS.Signer();
        const token = signer.getAuthToken(obj);
        return token;
    } catch (error) {
        console.error(`could not get auth token: ${error}`);
        return null;
    }
}

module.exports = authRds;
