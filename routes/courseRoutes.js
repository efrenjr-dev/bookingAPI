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
    getEnrolleesController,
} = courseControllers;

const { verify, verifyAdmin } = require("../auth");

router.get("/", verify, verifyAdmin, getAllCoursesController);
router.post("/", addCourseController);
router.get("/getActiveCourses", getActiveCoursesController);
router.get("/getSingleCourse/:id", getSingleCourseController);
router.put("/:id", verify, verifyAdmin, updateCourseController);
router.put("/archive/:id", verify, verifyAdmin, archiveCourseController);
router.put("/activate/:id", verify, verifyAdmin, activateCourseController);
router.get("/enrollees/:id", verify, verifyAdmin, getEnrolleesController);

module.exports = router;
