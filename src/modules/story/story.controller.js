const { StoryDao } = require("../../dao/story.dao");
const { UserDao } = require("../../dao/user.dao");

exports.getAll = async (req, res, next) => {
    try {
        const { filter } = req.query;
        const stories = (await StoryDao.getAll(filter)) || [];
        return res.json({ data: stories, message: "ok" }).end();
    } catch (error) {
        next(error);
    }
};

exports.getAllMine = async (req, res, next) => {
    try {
        const { id: userID } = req.user;
        console.log("userID: " + userID);
        if (!userID)
            return res
                .status(400)
                .json({ message: "Bad Request" })
                .end();
        const { filter } = req.query;
        const stories = await StoryDao.getAllMine(userID, filter);
        return res.json({ data: stories, message: "ok" }).end();
    } catch (error) {
        next(error);
    }
};

exports.createStory = async (req, res, next) => {
    try {
        req.body.user = req.user;
        const result = await StoryDao.insert(req.body);
        return res
            .status(201)
            .json({ message: "Created", insertId: result.insertId })
            .end();
    } catch (error) {
        next(error);
    }
};
