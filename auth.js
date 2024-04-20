const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const DEBUG = !!+process.env.DEBUG;

module.exports.createAccessToken = (user) => {
    DEBUG && console.log(user);
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
    };

    return jwt.sign(data, SECRET, {});
};

module.exports.verify = (req, res, next) => {
    DEBUG && console.log("AUTH Verify");
    let token = req.headers.authorization;
    DEBUG && console.log(token);

    if (typeof token === "undefined") {
        return res.send({ auth: "Failed. No Token" });
    } else {
        token = token.slice(7, token.length);

        jwt.verify(token, SECRET, function (err, decodedToken) {
            if (err) {
                return res.send({
                    auth: "Failed",
                    message: err.message,
                });
            } else {
                DEBUG && console.log(decodedToken);
                req.user = decodedToken;
                next();
            }
        });
    }
};

module.exports.verifyAdmin = (req, res, next) => {
    DEBUG && console.log("VERIFY Admin");
    DEBUG && console.log(req.user.isAdmin);
    if (!req.user.isAdmin) {
        return res.send({
            auth: "Failed",
            message: "Action Forbidden",
        });
    } else {
        next();
    }
};
