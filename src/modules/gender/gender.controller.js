const { GenderDao } = require("../../dao/gender.dao");

exports.getGenders = async (req, res, next) => {
    try {
        const genders = await GenderDao.getAll();
        return res.json({ data: genders, message: "ok" }).end();
    } catch (error) {
        next(error);
    }
};
