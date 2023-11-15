const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports.verifyToken = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).send("Authorization header manquant");
        }
        const token = authorizationHeader.split(' ')[1];
        const decoded = await jwt.verify(token, process.env.TOKEN_KEY)
        req.user = { ...decoded, auth: true };
        next()
    } catch (error) {
        return res.status(401).send({auth: false, message: error});
    }
}
