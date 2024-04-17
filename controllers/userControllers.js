const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../auth");

registerUserController = (req, res) => {
    console.log("PUT Register User");
    console.log(req.body);

    if (req.body.password.length < 8)
        return res.send({ message: "Password is too short." });

    const hashedPW = bcrypt.hashSync(req.body.password, 10);
    console.log(hashedPW);

    User.findOne({ email: req.body.email })
        .then((foundUser) => {
            if (foundUser !== null && foundUser.email === req.body.email) {
                return res.send({ message: "Duplicate Email Found!" });
            } else {
                let newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    mobileNo: req.body.mobileNo,
                    email: req.body.email,
                    password: hashedPW,
                });

                newUser
                    .save()
                    .then((result) => res.send(result))
                    .catch((err) => res.send(err));
            }
        })
        .catch((err) => res.send(err));
};

loginUserController = (req, res) => {
    console.log("POST Login User");
    console.log(req.params);
    User.findOne({ email: req.body.email })
        .then((result) => {
            if (result === null) {
                return res.send({ message: "No User Found." });
            } else {
                console.log(req.body);
                const isPasswordCorrect = bcrypt.compareSync(
                    req.body.password,
                    result.password
                );
                console.log(isPasswordCorrect);
                if (isPasswordCorrect) {
                    return res.send({ accessToken: createAccessToken(result) });
                } else {
                    return res.send({ message: "Password is incorrect." });
                }
            }
        })
        .catch((err) => res.send(err));
};

getAllUsersController = (req, res) => {
    console.log("GET All Users");
    // console.log(req.user);
    User.find()
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

getSingleUserController = (req, res) => {
    console.log("GET Single User");
    console.log(req.params);
    User.findById(req.params.id)
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

updateProfileController = (req, res) => {
    console.log("PUT Update User");
    console.log(req.user.id);
    console.log(req.body);
    // res.send({ Message: "Update profile", User: req.user });

    let updates = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobileNo: req.body.mobileNo,
    };

    User.findByIdAndUpdate(req.user.id, updates, { new: true })
        .then((updatedUser) => res.send(updatedUser))
        .catch((err) => res.send(err));
};

module.exports = {
    getAllUsersController,
    registerUserController,
    getSingleUserController,
    loginUserController,
    updateProfileController,
};
