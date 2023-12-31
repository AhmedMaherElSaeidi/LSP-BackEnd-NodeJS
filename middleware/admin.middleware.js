const adminAuth = (req, res, next) => {
    const user = req.user;

    if (user.type != 'librarian') {
        res.statusCode = 403;
        res.json({message : [{msg: "Authorization Failed."}]});
    }

    next();
}

module.exports = adminAuth;