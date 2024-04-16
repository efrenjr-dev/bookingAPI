const express = require("express");
const router = express.Router();

const courseControllers = require("../controllers/courseControllers");

const {
    getAllCoursesController,
    addCourseController,
    getActiveCoursesController,
    getSingleCourseController,
    updateCourseController,
    archiveCourseController,
    activateCourseController,
} = courseControllers;



router.get("/", getAllCoursesController);
router.post("/", addCourseController);
router.get("/getActiveCourses", getActiveCoursesController);
router.get("/getSingleCourse/:id", getSingleCourseController);
router.put("/:id", updateCourseController);
router.put("/archive/:id", archiveCourseController);
router.put("/activate/:id", activateCourseController);

module.exports = router;
