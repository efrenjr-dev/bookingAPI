const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers");

const {
    getAllUsersController,
    registerUserController,
    getSingleUserController,
    loginUserController,
} = userControllers;

const { verify } = require("../auth");

router.get("/", verify, getAllUsersController);
router.post("/", registerUserController);
router.get("/:id", getSingleUserController);
router.post("/login", loginUserController);

module.exports = router;
