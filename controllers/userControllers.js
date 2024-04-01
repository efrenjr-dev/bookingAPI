const User = require("../models/User");

// testUserController = (req, res) => {
//     res.send("Test User Controller");
// };
getAllUsersController = (req, res) => {
    User.find()
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

registerUserController = (req, res) => {
    console.log(req.body);

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
};



module.exports = { getAllUsersController, registerUserController };