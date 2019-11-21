const router = require("express").Router();
const service = require("../../lib/middleware/auth");
const genderController = require("./gender.controller");

router.use(service.verify);
router.get("/", genderController.getGenders);

module.exports = router;
