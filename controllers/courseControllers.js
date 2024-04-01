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

module.exports = {
    getAllCoursesController,
    addCourseController,
};
