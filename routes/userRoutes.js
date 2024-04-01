const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers");

const { getAllUsersController, registerUserController } = userControllers;

router.get("/", getAllUsersController);
router.post("/", registerUserController);

module.exports = router;