const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
        if (err)
            return res.status(401).json({ message: `Invalid token.\n${err}` });

        if (payload.type != 'librarian') {
            res.statusCode = 403;
            res.send("Authorization Failed.");
        }

        next();
    });
}

module.exports = adminAuth;