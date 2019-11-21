const jwt = require("jsonwebtoken");
const { UserDao, User } = require("../../dao/user.dao");
const auth = require("../../lib/helpers/crypto");

const secretKey = require("../../config/config").secretKey;

const invalid = "Invalid credentials";
const missing = "Credential are missing";
const emailInUse = "The given email is in use";

exports.signup = async (req, res, next) => {
    try {
        // console.log("req:", req.body);
        const { email, password } = req.body;
        if (!password)
            return res
                .status(404)
                .json({ message: missing })
                .end();

        const currUser = await UserDao.findByEmail(email);
        if (currUser)
            return res
                .status(404)
                .json({ message: emailInUse })
                .end();

        const hash = await auth.hash(password);
        const { insertId } = await UserDao.insert({ ...req.body, password: hash });
        delete req.body.password;
        const token = jwt.sign({ user: { ...req.body, id: insertId } }, secretKey, {
            expiresIn: "7d"
        });

        return res.json({ token, status: "ok" }).end();
    } catch (error) {
        console.log("mylog:", error);
        next(error);
    }
};

exports.signin = async (req, res, next) => {
    try {
        const { email = "", password = "" } = req.body;
        let user = await UserDao.findByEmail(email);
        if (!user)
            return res
                .status(404)
                .json({ message: invalid })
                .end();

        user = User.from(user);
        const isValid = await auth.compare(password, user.password);
        if (!isValid)
            return res
                .status(401)
                .send({ message: invalid })
                .end();

        user.clean();
        const token = jwt.sign({ user }, secretKey, { expiresIn: "7d" });
        return res.send({ token, status: "ok" });
    } catch (error) {
        next(error);
    }
};
