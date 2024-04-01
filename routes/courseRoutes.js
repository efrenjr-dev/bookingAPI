const express = require("express");
const router = express.Router();

const courseControllers = require("../controllers/courseControllers");

const { getAllCoursesController, addCourseController} = courseControllers;

router.get("/", getAllCoursesController);
router.post("/", addCourseController);

module.exports = router;
