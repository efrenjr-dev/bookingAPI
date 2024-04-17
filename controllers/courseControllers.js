const Course = require("../models/Course");
const debug = !!+process.env.DEBUG;

getAllCoursesController = (req, res) => {
    debug && console.log("GET All Courses");
    Course.find()
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

addCourseController = (req, res) => {
    debug && console.log("POST Add Course");
    debug && console.log(req.body);

    let newCourse = new Course({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    });

    newCourse
        .save()
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

getActiveCoursesController = (req, res) => {
    debug && console.log("GET Active Courses");
    Course.find({ isActive: true })
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

getSingleCourseController = (req, res) => {
    debug && console.log("GET Single Course");
    debug && console.log(req.params);
    Course.findById(req.params.id)
        .then((foundCourse) => res.send(foundCourse))
        .catch((err) => res.sender(err));
};

updateCourseController = (req, res) => {
    debug && console.log("PUT Update Course");
    debug && console.log(req.params);
    debug && console.log(req.body);
    let courseUpdates = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    };
    Course.findByIdAndUpdate(req.params.id, courseUpdates, { new: true })
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

archiveCourseController = (req, res) => {
    debug && console.log("PUT Archive Course");
    debug && console.log(req.params);
    let courseUpdates = {
        isActive: false,
    };
    Course.findByIdAndUpdate(req.params.id, courseUpdates, { new: true })
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

activateCourseController = (req, res) => {
    debug && console.log("PUT Activate Course");
    debug && console.log(req.params);
    let courseUpdates = {
        isActive: true,
    };
    Course.findByIdAndUpdate(req.params.id, courseUpdates, { new: true })
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

getEnrolleesController = (req, res) => {
    debug && console.log("GET Enrollees");
    debug && console.log(req.params);
    // return res.send({ message: "GET Enrollments" });

    Course.findById(req.params.id)
        .then((foundCourse) => res.send(foundCourse.enrollees))
        .catch((err) => res.send(err));
};

module.exports = {
    getAllCoursesController,
    addCourseController,
    getActiveCoursesController,
    getSingleCourseController,
    updateCourseController,
    archiveCourseController,
    activateCourseController,
    getEnrolleesController,
};
