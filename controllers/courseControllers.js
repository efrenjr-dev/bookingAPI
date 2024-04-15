const Course = require("../models/Course");

// testCourseController = (req, res) => {
//     res.send("Test Course Controller");
// };

getAllCoursesController = (req, res) => {
    Course.find()
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

addCourseController = (req, res) => {
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
    Course.find({ isActive: true })
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

getSingleCourseController = (req, res) => {
    console.log(req.params);
    Course.findById(req.params.id)
        .then((foundCourse) => res.send(foundCourse))
        .catch((err) => res.sender(err));
};

updateCourseController = (req, res) => {
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

// 'getActiveCourses'
// '/getSingleCourse/:id'

module.exports = {
    getAllCoursesController,
    addCourseController,
    getActiveCoursesController,
    getSingleCourseController,
    updateCourseController,
};
