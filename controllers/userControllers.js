const User = require("../models/User");

// testUserController = (req, res) => {
//     res.send("Test User Controller");
// };
getAllUsersController = (req, res) => {
    console.log("GET All Users");
    User.find()
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

registerUserController = (req, res) => {
    console.log("PUT Register User");
    console.log(req.body);

    User.findOne({ email: req.body.email })
        .then((foundUser) => {
            if (foundUser !== null && foundUser.email === req.body.email) {
                return res.send("Duplicate Email Found!");
            } else {
                let newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    mobileNo: req.body.mobileNo,
                    email: req.body.email,
                    password: req.body.password,
                });

                newUser
                    .save()
                    .then((result) => res.send(result))
                    .catch((err) => res.send(err));
            }
        })
        .catch((err) => res.send(err));
};

getSingleUserController = (req, res) => {
    console.log("GET Single User");
    console.log(req.params);
    User.findById(req.params.id)
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

module.exports = {
    getAllUsersController,
    registerUserController,
    getSingleUserController,
};
