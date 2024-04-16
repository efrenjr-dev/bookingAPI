const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 4000;

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.2ttig.gcp.mongodb.net/${process.env.DB_DB}?retryWrites=true&w=majority`
    );
}

let db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error."));
db.once("open", () => console.log("Connected to MongoDB"));

app.use(express.json());

const courseRoutes = require("./routes/courseRoutes");
app.use("/courses", courseRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

app.listen(port, () => console.log(`Server is running at port ${port}`));
