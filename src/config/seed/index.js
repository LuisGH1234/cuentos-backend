// const Config = require("../config");
// const AWS_RDS = require("../rds-auth");
// const mysql = require("mysql2/promise");
const mysql = require("../mysql");
const gender = require("./gender.seed");

async function seed() {
    let conn = null;
    try {
        conn = mysql.createConnection(true);
        await gender.seedGenders(conn);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
        // if (conn) await conn.rollback();
    }
}

seed();
