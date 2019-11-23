const router = require("express").Router();
const service = require("../../lib/middleware/auth");
const storyController = require("./story.controller");

router.get("/", storyController.getAll);
router.get("/:id/detail", storyController.getByID);

router.use(service.verify);
router.get("/my-stories", storyController.getAllMine);
router.post("/", storyController.createStory);

module.exports = router;
