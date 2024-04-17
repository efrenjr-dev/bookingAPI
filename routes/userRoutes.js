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
} = userControllers;

const { verify, verifyAdmin } = require("../auth");

router.get("/", verify, getAllUsersController);
router.post("/", registerUserController);
router.get("/:id", getSingleUserController);
router.post("/login", loginUserController);
router.put("/updateProfile", verify, updateProfileController);
router.put("/enroll", verify, enrollController);

module.exports = router;
