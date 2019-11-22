const { query, SQL, createConnection } = require("../config/mysql");

class StoryDao {
    static async getAll(filter = "", userID = null) {
        let conn = null;
        try {
            const { sql, args } = SQL`
        select distinct s.* from story s 
            left join user u on s.userId = u.id 
            left join story_gender sg on s.id = sg.story_id
            left join gender g on sg.gender_id = g.id
        where (s.name like ${"%" + filter + "%"} or 
            g.name like ${"%" + filter + "%"} or 
            u.name like ${"%" + filter + "%"})`;

            conn = createConnection();
            conn.connect();
            const pc = conn.promise();
            const [stories] = await pc.query(sql, args);
            console.log(stories);
            for (const story of stories) {
                const { sql, args } = SQL`select * from user where id = ${story.userId}`;
                const [res] = await pc.query(sql, args);
                delete res[0].password;
                story.user = res[0];
                delete story.userId;
                const {
                    sql: sql2,
                    args: args2
                } = SQL`select * from story_gender where story_id = ${story.id}`;
                const [res2] = await pc.query(sql2, args2);
                // console.log("23", res2);
                story.genders = [];
                for (const sg of res2) {
                    let {
                        sql: sql3,
                        args: args3
                    } = SQL`select * from gender where id = ${sg.gender_id}`;
                    const [res3] = await pc.query(sql3, args3);
                    story.genders.push(res3[0]);
                }
            }

            conn.end();
            return stories;
        } catch (error) {
            if (conn && typeof conn === "object") conn.end();
            console.log(error);
            throw new Error(error);
        }
    }

    static async getAllMine(userID, filter = "") {
        let conn = null;
        try {
            const { sql, args } = SQL`
        select distinct s.* from story s 
            left join user u on s.userId = u.id 
            left join story_gender sg on s.id = sg.story_id
            left join gender g on sg.gender_id = g.id
        where (s.name like ${"%" + filter + "%"} or 
            g.name like ${"%" + filter + "%"} or 
            u.name like ${"%" + filter + "%"}) 
            and s.userId = ${userID}`;

            conn = createConnection();
            conn.connect();
            const pc = conn.promise();
            const [stories] = await pc.query(sql, args);
            console.log(stories);
            for (const story of stories) {
                const { sql, args } = SQL`select * from user where id = ${story.userId}`;
                const [res] = await pc.query(sql, args);
                delete res[0].password;
                story.user = res[0];
                delete story.userId;
                const {
                    sql: sql2,
                    args: args2
                } = SQL`select * from story_gender where story_id = ${story.id}`;
                const [res2] = await pc.query(sql2, args2);
                // console.log("23", res2);
                story.genders = [];
                for (const sg of res2) {
                    let {
                        sql: sql3,
                        args: args3
                    } = SQL`select * from gender where id = ${sg.gender_id}`;
                    const [res3] = await pc.query(sql3, args3);
                    story.genders.push(res3[0]);
                }
            }

            conn.end();
            return stories;
        } catch (error) {
            if (conn && typeof conn === "object") conn.end();
            console.log(error);
            throw new Error(error);
        }
    }

    /**
     * @returns - { insertId: number }
     * */
    static async insert(obj) {
        const story = Story.from(obj).forInsert();
        const [result] = await query(SQL`insert into story set ${story}`);
        return result;
    }

    static async update(obj) {
        const story = Story.from(obj).forUpdate();
        const [result] = await query(SQL`update story set ${story}`);
        console.log("result update", result);
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

    forUpdate() {
        delete this.createdAt;
        delete this.id;
        delete this.gender;
        delete this.user;
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
