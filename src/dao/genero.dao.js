const { query, SQL } = require("../config/mysql");

class GeneroDao {
    static getAll() {
        return [];
    }
}

class Genero {
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.description = obk.description;
    }

    static from(obj) {
        return new Genero(obj);
    }
}

module.exports = { GeneroDao, Genero };
