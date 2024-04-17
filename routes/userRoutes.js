const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers");

const {
    getAllUsersController,
    registerUserController,
    getSingleUserController,
    loginUserController,
    updateProfileController,
    enrollController,
    getEnrollmentsController,
} = userControllers;

const { verify } = require("../auth");

router.get("/", verify, getAllUsersController);
router.post("/", registerUserController);
router.get("/getUserDetails", verify, getSingleUserController);
router.post("/login", loginUserController);
router.put("/updateProfile", verify, updateProfileController);
router.put("/enroll", verify, enrollController);
router.get("/enrollments", verify, getEnrollmentsController);

module.exports = router;
