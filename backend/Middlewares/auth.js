module.exports = (req, res, next) => {
    if (req.cookies !== undefined && req.cookies.Auth === 'true') {
        req.isAuthenticated = true;
        next();
    }
    else {
        req.isAuthenticated = false;
        // res.send("Authenticate First....");
        next();
    }
}