const jwt = require("jsonwebtoken");
const secretKey = require("../../config/config").secretKey;

const verify = (req, res, next) => {
    try {
        const authorization = req.get("authorization");
        if (!authorization || authorization.length === 0)
            return res.status(401).send({ message: "Unauthorized" });
        // console.log(authorization);
        const token = authorization.split(" ");
        // { exp, user, iat }
        const payload = jwt.verify(token[1], secretKey);
        // console.log(payload);

        const now = Math.floor(Date.now() / 1000);
        if (payload.exp <= now)
            return res.status(401).send({
                error: "El token ha expirado",
                message: "Unauthorized"
            });

        req.user = payload.user;
        next();
    } catch (error) {
        return res.status(401).send({ error: error.message, message: "Unauthorized" });
    }
};

module.exports = {
    verify
};
