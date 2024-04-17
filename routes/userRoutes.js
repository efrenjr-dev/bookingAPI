const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers");

const {
    getAllUsersController,
    registerUserController,
    getSingleUserController,
    loginUserController,
    updateProfileController,
} = userControllers;

const { verify, verifyAdmin } = require("../auth");

router.get("/", verify, getAllUsersController);
router.post("/", registerUserController);
router.get("/:id", getSingleUserController);
router.post("/login", loginUserController);
router.put("/updateProfile", verify, updateProfileController);

module.exports = router;
