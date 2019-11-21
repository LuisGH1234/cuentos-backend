const { query, SQL } = require("../config/mysql");

class GenderDao {
    static async getAll() {
        const [result, _, err] = await query(SQL`select * from gender`);
        return result;
    }
}

class Gender {
    constructor(obj) {
        this.createdAt = obj.createdAt;
        this.id = obj.id;
        this.name = obj.name;
        this.description = obk.description;
    }

    forInsert() {
        delete this.createdAt;
        delete this.id;
        return this;
    }

    clean() {
        delete this.createdAt;
        return this;
    }

    static from(obj) {
        return new Gender(obj);
    }
}

module.exports = { GenderDao, Gender };
