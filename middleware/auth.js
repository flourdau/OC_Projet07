const jwt = require('jsonwebtoken')

// Verify token & add user ID on request
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.TOKEN)
        const userId = decodedToken.userId;
        req.auth = { userId: userId }
        next()
    }
    catch(error) { res.status(500).json({ error }) }}