const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: [true,"First Name is required."]},
    lastName: {type: String, required: [true,"Last Name is required."]},
    mobileNo: {type: String, required: [true,"Mobile Number is required."]},
    email: {type: String, required: [true,"Email is required."]},
    password: {type: String, required: [true,"Password is required."]},
    isAdmin: {
        type: String,
        default: false,
    },
});

module.exports = mongoose.model("User", userSchema, "users");