const { query, SQL } = require("../config/mysql");

class StoryDao {
    static async getAllByUser(userID) {
        return [];
    }

    static getAll() {
        return [];
    }
}

class Story {
    constructor(obj) {
        this.createdAt = obj.createdAt;
        this.id = obj.id;
        this.name = obj.name;
        this.text = obj.text;
        this.imageUrl = obj.imageUrl;
        this.gender = obj.gender; // []Gender
        this.user = obj.user; // {}User
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
        return new Story(obj);
    }
}

module.exports = { Story, StoryDao };
