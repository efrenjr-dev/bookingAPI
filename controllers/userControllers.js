const User = require("../models/User");
const Course = require("../models/Course");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../auth");
const debug = !!+process.env.DEBUG;

registerUserController = (req, res) => {
    debug && console.log("PUT Register User");
    debug && console.log(req.body);

    if (req.body.password.length < 8)
        return res.send({ message: "Password is too short." });

    const hashedPW = bcrypt.hashSync(req.body.password, 10);
    debug && console.log(hashedPW);

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
    debug && console.log("POST Login User");
    debug && console.log(req.params);
    User.findOne({ email: req.body.email })
        .then((result) => {
            if (result === null) {
                return res.send({ message: "No User Found." });
            } else {
                debug && console.log(req.body);
                const isPasswordCorrect = bcrypt.compareSync(
                    req.body.password,
                    result.password
                );
                debug && console.log(isPasswordCorrect);
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
    debug && console.log("GET All Users");
    // debug && console.log(req.user);
    User.find()
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

getSingleUserController = (req, res) => {
    debug && console.log("GET Single User");
    debug && console.log(req.user);
    User.findById(req.user.id)
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

updateProfileController = (req, res) => {
    debug && console.log("PUT Update User");
    debug && console.log(req.user.id);
    debug && console.log(req.body);
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

enrollController = async (req, res) => {
    debug && console.log("PUT Enroll");
    debug && console.log(req.user);
    debug && console.log(req.body);

    // return res.send({ message: "PUT Enroll" });

    if (req.user.isAdmin)
        return res.send({
            auth: "Failed",
            message: "Action Forbidden",
        });
    // return res.send({"message":"not admin"})

    let isUserUpdated = await User.findById(req.user.id).then((foundUser) => {
        foundUser.enrollments.push({
            courseId: req.body.courseId,
            enrolledOn: new Date(),
            status: "Enrolled",
        });

        return foundUser
            .save()
            .then((savedUser) => true)
            .catch((err) => err.message);
    });

    debug && console.log(`Is User Updated? ${isUserUpdated}`);
    if (!isUserUpdated) return res.send(isUserUpdated);

    let isCourseUpdated = await Course.findById(req.body.courseId).then(
        (foundCourse) => {
            foundCourse.enrollees.push({
                userId: req.user.id,
                enrolledOn: new Date(),
                status: "Enrolled",
            });

            return foundCourse
                .save()
                .then((savedUser) => true)
                .catch((err) => err.message);
        }
    );

    debug && console.log(`Is Course Updated? ${isCourseUpdated}`);
    if (!isCourseUpdated) return res.send(isCourseUpdated);

    if (isUserUpdated && isCourseUpdated)
        return res.send("Enrolled Successfully.");
};

getEnrollmentsController = (req, res) => {
    debug && console.log("GET Enrollments");
    // return res.send({ message: "GET Enrollments" });

    User.findById(req.user.id)
        .then((foundUser) => res.send(foundUser.enrollments))
        .catch((err) => res.send(err));
};

module.exports = {
    getAllUsersController,
    registerUserController,
    getSingleUserController,
    loginUserController,
    updateProfileController,
    enrollController,
    getEnrollmentsController,
};
