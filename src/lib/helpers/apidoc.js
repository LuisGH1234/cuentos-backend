module.exports = (req, res) => {
    const apiDoc = process.env.APIDOC;
    if (!apiDoc)
        return res
            .status(400)
            .json({ message: "Not Found" })
            .end();

    res.writeHead(301, { Location: apiDoc });
    res.end();
};
