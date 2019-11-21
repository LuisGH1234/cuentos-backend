const { query, SQL } = require("../config/mysql");

class StoryDao {
    static async getAll(filter = '') {
        const [result] = await query(SQL`
        select * from story s 
            left join user u on s.userId = i.id 
            left join story_gender sg on s.id = sg.story_id
            left join gender g on sg.gender_id = g.id
        where s.name like '%${filter}%' or 
            g.name like '%${filter}%' or 
            u.name like '%${filter}%'
        `);
        return result;
    }

    static async getAllMine(userID, filter = '') {
        const [result] = await query(SQL`
        select * from story s 
            left join user u on s.userId = i.id 
            left join story_gender sg on s.id = sg.story_id
            left join gender g on sg.gender_id = g.id
        where (s.name like '%${filter}%' or 
            g.name like '%${filter}%' or 
            u.name like '%${filter}%') and s.userId = ${userID}
        `);
        return result;
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
