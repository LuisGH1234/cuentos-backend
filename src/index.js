const express = require("express");
const cors = require("cors");
const app = express();

app.set("PORT", process.env.PORT || 3000);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("still alive").end());
app.get("/api/user", require("./modules/user.module"));

app.listen(app.get("PORT"), err => {
    if (err) return console.error("Error:", err);
    console.log("Running in port " + app.get("PORT"));
});
