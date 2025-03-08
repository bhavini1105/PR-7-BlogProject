const userAuth = (req, res, next) => {
    let { userId } = req.cookies;

    if (!userId) {
        return res.redirect("/signin"); 
    }
    return next();

};

module.exports = userAuth;