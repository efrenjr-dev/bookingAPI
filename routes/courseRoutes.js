const express = require("express");
const router = express.Router();

const courseControllers = require("../controllers/courseControllers");

const {
    getAllCoursesController,
    addCourseController,
    getActiveCoursesController,
    getSingleCourseController,
    updateCourseController,
} = courseControllers;

router.get("/", getAllCoursesController);
router.post("/", addCourseController);
router.get("/getActiveCourses", getActiveCoursesController);
router.get("/getSingleCourse/:id", getSingleCourseController);
router.put("/:id", updateCourseController);

module.exports = router;
