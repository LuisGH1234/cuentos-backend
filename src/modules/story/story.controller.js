const { StoryDao } = require("../../dao/story.dao");
const getSignedUrl = require("../../lib/helpers/s3-signedurl");

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
        const { file } = req.body;
        const result = await StoryDao.insert(req.body);
        // result.insertId
        const url = getSignedUrl(
            {} /*{
            filename: file.filename,
            extension: file.extension,
            id: result.insertId
        }*/
        );
        // console.log("pUrl", presignedUrl);
        return res
            .status(201)
            .json({ message: "Created", insertId: result.insertId, payload: url })
            .end();
    } catch (error) {
        next(error);
    }
};

exports.getByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await StoryDao.getByID(id);

        return res
            .status(201)
            .json({ message: "Ok", data: result })
            .end();
    } catch (error) {
        next(error);
    }
};
