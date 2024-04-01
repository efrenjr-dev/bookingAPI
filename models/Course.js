const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required."] },
    description: { type: String, required: [true, "Description is required."] },
    price: { type: Number, required: [true, "Price is required."] },
    isActive: { type: Boolean, default: true },
    createdOn: { type: Date, default: new Date() },
});

module.exports = new mongoose.model("Course", courseSchema, "courses");
