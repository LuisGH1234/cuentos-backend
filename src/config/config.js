class Config {
    static get region() {
        return "us-east-1";
    }

    /** port */
    static get dbPort() {
        return 3306;
    }

    /** user */
    static get dbUsername() {
        return "iam-user-backend03";
    }

    /** database */
    static get dbName() {
        return "storydb";
    }

    /** host */
    static get dbEndpoint() {
        return "mydatabase.ctucaw8tmi8k.us-east-1.rds.amazonaws.com";
    }

    /** Random value */
    static get password() {
        return "123456789";
    }

    static get secretKey() {
        return "qwgftyer-iau/$tris";
    }
}

module.exports = Config;
