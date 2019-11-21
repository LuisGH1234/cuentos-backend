require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const apiDoc = "https://documenter.getpostman.com/view/5216695/SW7aYTEs?version=latest";

app.set("PORT", process.env.PORT || 3000);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("still alive").end());
app.get("/apidoc", (req, res) => {
    res.writeHead(301, { Location: apiDoc });
    res.end();
});
app.use("/api/users", require("./modules/user/user.router"));
app.use("/api/stories", require("./modules/story/story.router"));
app.use("/api/genders", require("./modules/gender/gender.router"));

app.use((e, req, res, next) => {
    console.log(e);
    return res.status(500).json({
        route: req.originalUrl,
        error: { stack: e.message || "Internal Server error" }
    });
});

app.listen(app.get("PORT"), err => {
    if (err) return console.error("Error:", err);
    console.log("Running in port " + app.get("PORT"));
});
