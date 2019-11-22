const mysql = require("mysql2");
const Config = require("./config");
const AWS_RDS = require("./rds-auth");
// const fs = require("fs");
// const { join } = require("path");

// Create the connection pool. The pool-specific settings are the defaults
const createConnection = (multipleStatements = false) => {
    const token = AWS_RDS({
        region: Config.region,
        hostname: Config.dbEndpoint,
        port: Config.dbPort,
        username: Config.dbUsername
    });
    // console.log("Token:", token);
    return mysql.createConnection({
        host: Config.dbEndpoint,
        user: Config.dbUsername,
        password: token,
        database: Config.dbName,
        port: Config.dbPort,
        multipleStatements,
        ssl: "Amazon RDS",
        authSwitchHandler: (data, cb) => {
            // modifies the authentication handler
            if (data.pluginName === "mysql_clear_password") {
                // console.log(data, cb.toString());
                // authentication token is sent in clear text but connection uses SSL encryption
                cb(null, Buffer.from(token + "\0"));
            }
        }
    });
};

async function testConnection(showResult = false) {
    try {
        // const result = await pool.promise().query("select 1 + 1");
        const result = await query(SQL`select 1 + 1`);
        console.log("DB is connected");
        if (showResult) console.log("The reult is (mysql):", result);
    } catch (error) {
        console.error("Error trying to connect:", error);
    }
}

/** @returns [rows, fields, error] */
async function query({ sql, args }) {
    let conn = null;
    try {
        conn = createConnection();
        conn.connect();
        // console.log(sql, args);
        const res = await conn.promise().query(sql, args);
        conn.end();
        // console.log("res-query:", res);
        return res;
        // return await pool.promise().query(sql, args);
    } catch (error) {
        // console.log("Query error:", error);
        if (conn && typeof conn === "object") conn.end();
        throw new Error(error);
        // return [null, null, error];
    }
}

/** @param sql - string */
function SQL(sql, ...args) {
    if (typeof sql === "string") return { sql, args: undefined };
    else if (Array.isArray(sql)) {
        return { sql: sql.map(x => x.replace(/(\r\n|\n|\r)/gm, " ")).join("?"), args };
    } else throw new Error("SQL: Type error exception");
}

testConnection();

module.exports = {
    query,
    SQL,
    createConnection
};
