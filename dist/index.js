"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
dotenv.config();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err, db) => {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    }
    else {
        console.log("Connected to MongoDB");
    }
});
// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.get("/", (req, res) => {
    res.send("Welcome to FireAPI...");
});
app.listen(8800, () => {
    console.log("Backend server is running...");
});
//# sourceMappingURL=index.js.map