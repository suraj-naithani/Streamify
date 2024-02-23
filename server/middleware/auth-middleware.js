const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).send({ error: "Token not provided" });
    }

    const jwtToken = token.replace("Bearer", "").trim();

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT);
        const userData = await User.findOne({ email: isVerified.email });

        req.user = userData;
        req.token = token;
        req.userId = userData._id;
    } catch (error) {
        return res.status(500).send({ msg: "Invalid token" });
    }
    next();
}

module.exports = authMiddleware;