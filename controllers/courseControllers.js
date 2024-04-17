const Course = require("../models/Course");

// testCourseController = (req, res) => {
//     res.send("Test Course Controller");
// };

getAllCoursesController = (req, res) => {
    console.log("GET All Courses");
    Course.find()
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

addCourseController = (req, res) => {
    console.log("POST Add Course");
    console.log(req.body);

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
    console.log("GET Active Courses");
    Course.find({ isActive: true })
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

getSingleCourseController = (req, res) => {
    console.log("GET Single Course");
    console.log(req.params);
    Course.findById(req.params.id)
        .then((foundCourse) => res.send(foundCourse))
        .catch((err) => res.sender(err));
};

updateCourseController = (req, res) => {
    console.log("PUT Update Course");
    console.log(req.params);
    console.log(req.body);
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
    console.log("PUT Archive Course");
    console.log(req.params);
    let courseUpdates = {
        isActive: false,
    };
    Course.findByIdAndUpdate(req.params.id, courseUpdates, { new: true })
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

activateCourseController = (req, res) => {
    console.log("PUT Activate Course");
    console.log(req.params);
    let courseUpdates = {
        isActive: true,
    };
    Course.findByIdAndUpdate(req.params.id, courseUpdates, { new: true })
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

getEnrolleesController = (req, res) => {
    console.log("GET Enrollees");
    console.log(req.params);
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
