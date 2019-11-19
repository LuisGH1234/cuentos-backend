const { query, SQL } = require("../config/mysql");

class CuentoDao {
    static getAllByAuthor(authorID) {
        return [];
    }
}

class Cuento {
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.createdAt = obj.createdAt;
        this.text = obj.text;
        this.imageUrl = obj.imageUrl;
        this.genre = obj.genre;
        this.author = obj.author || obj.user;
    }

    static from(obj) {
        return new Cuento(obj);
    }
}

module.exports = { Cuento, CuentoDao };
