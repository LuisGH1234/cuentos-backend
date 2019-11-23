require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.set("PORT", 3001);

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("still alive").end());
app.get("/apidoc", require("./lib/helpers/apidoc"));
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
