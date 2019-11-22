const { query, SQL } = require("../config/mysql");

class UserDao {
    static async findByEmail(email) {
        const [result, _, err] = await query(SQL`select * from user where email = ${email}`);
        // console.log(result, err);
        return result[0];
    }

    /**
     * @returns - { insertId: number }
     * */
    static async insert(obj) {
        const user = User.from(obj).forInsert();
        const [res, _, err] = await query(SQL`insert into user set ${user}`);
        return res;
    }

    static async findById(id) {
        const [result, _, err] = await query(SQL`select * from user where id = ${id}`);
        if (result[0]) delete result[0].password;
        return result[0];
    }
}

class User {
    constructor(obj) {
        this.createdAt = obj.createdAt;
        this.id = obj.id;
        this.name = obj.name;
        this.lastname = obj.lastname;
        this.email = obj.email;
        this.password = obj.password; // hash
        this.phone = obj.phone;
    }

    forInsert() {
        delete this.createdAt;
        delete this.id;
        return this;
    }

    clean() {
        delete this.createdAt;
        delete this.password;
        return this;
    }

    static from(obj) {
        return new User(obj);
    }
}

module.exports = { User, UserDao };
