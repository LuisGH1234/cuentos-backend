const { query, SQL } = require("../config/mysql");

class UserDao {
    static getMe(email, password) {
        return {};
    }
}

class User {
    constructor(obj) {
        this.name = name;
        this.lastname = lastname;
        this.email = obj.email;
        this.password = obj.password; // hash
    }

    static from(obj) {
        return new User(obj);
    }
}

module.exports = { User, UserDao };
