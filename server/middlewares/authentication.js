const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authentication = function (req, res, next) {
    try {
        const { token } = req.headers;
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userdata = decoded;
        User.findOne({ where: { email: req.userdata.email } })
            .then((user) => {
                if (!user) {
                    res.status(404).json({
                        message: "User not found",
                    });
                }
            });
        next();
    } catch (error) {
        res.status(401).json({
            message: "Forbidden access",
        });
    }
};

module.exports = authentication;
