const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const debug = !!+process.env.DEBUG;

module.exports.createAccessToken = (user) => {
    debug && console.log(user);
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
    };

    return jwt.sign(data, secret, {});
};

module.exports.verify = (req, res, next) => {
    debug && console.log("AUTH Verify");
    let token = req.headers.authorization;
    debug && console.log(token);

    if (typeof token === "undefined") {
        return res.send({ auth: "Failed. No Token" });
    } else {
        token = token.slice(7, token.length);

        jwt.verify(token, secret, function (err, decodedToken) {
            if (err) {
                return res.send({
                    auth: "Failed",
                    message: err.message,
                });
            } else {
                debug && console.log(decodedToken);
                req.user = decodedToken;
                next();
            }
        });
    }
};

module.exports.verifyAdmin = (req, res, next) => {
    debug && console.log("VERIFY Admin");
    debug && console.log(req.user.isAdmin);
    if (!req.user.isAdmin) {
        return res.send({
            auth: "Failed",
            message: "Action Forbidden",
        });
    } else {
        next();
    }
};
