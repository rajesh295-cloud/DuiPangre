const jwt = require("jsonwebtoken")
const User = require("../models/User")


module.exports.se = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, "usersecrets")
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token;
        req.user = user;
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
};