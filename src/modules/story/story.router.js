const router = require("express").Router();
const service = require("../../lib/middleware/auth");
const storyController = require("./story.controller");

router.get("/", storyController.getAll);
router.get("/:id", storyController.getByID);

router.use(service.verify);
router.post("/", storyController.createStory);
router.get("/mine", storyController.getAllMine);

module.exports = router;
