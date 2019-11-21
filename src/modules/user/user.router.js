const router = require("express").Router();
const service = require("../../lib/middleware/auth");
const userController = require("./user.controller");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);

router.use(service.verify);
router.get("/me", (req, res) => res.send(req.user).end());

module.exports = router;
