const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers");

const {
    getAllUsersController,
    registerUserController,
    getSingleUserController,
} = userControllers;

router.get("/", getAllUsersController);
router.post("/", registerUserController);
router.get("/:id", getSingleUserController);

module.exports = router;
