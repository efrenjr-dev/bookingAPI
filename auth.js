const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;

module.exports.createAccessToken = (user) => {
    console.log(user);
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
    };

    return jwt.sign(data, SECRET, {});
};

module.exports.verify = (req, res, next) => {
    console.log("AUTH Verify");
    let token = req.headers.authorization;
    console.log(token);

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
                console.log(decodedToken);
                req.user = decodedToken;
                next();
            }
        });
    }
};

module.exports.verifyAdmin = (req, res, next) => {
    console.log("VERIFY Admin");
    console.log(req.user.isAdmin);
    if (!req.user.isAdmin) {
        return res.send({
            auth: "Failed",
            message: "Action Forbidden",
        });
    } else {
        next();
    }
};
