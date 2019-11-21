const fs = require("fs");
const { join } = require("path");

exports.seedGenders = async conn => {
    if (!conn) throw new Error("SeedGenders: connection is null");
    try {
        console.log("Seeding Genders ...");
        const file = fs.readFileSync(join(__dirname, "../../../sql/seed/genders.seed.sql"));
        await conn.promise().beginTransaction();
        const genders = (await conn.promise().query("select * from gender"))[0];
        if (genders.length > 0) {
            console.log("seedGenders: not saved");
            return await conn.promise().rollback();
        }
        await conn.promise().query(file.toString("utf8"));
        await conn.promise().commit();
        console.log("seedGenders: done.");
    } catch (error) {
        console.error("seedGenders:", error);
        await conn.promise().rollback();
    }
};
