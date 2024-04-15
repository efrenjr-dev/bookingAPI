const express = require("express");
const router = express.Router();

const courseControllers = require("../controllers/courseControllers");

const {
    getAllCoursesController,
    addCourseController,
    getActiveCoursesController,
    getSingleCourseController,
} = courseControllers;

router.get("/", getAllCoursesController);
router.post("/", addCourseController);
router.get("/getActiveCourses", getActiveCoursesController);
router.get("/getSingleCourse/:id", getSingleCourseController);

module.exports = router;
