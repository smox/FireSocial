
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import { Request, Response } from 'express';
import { MongoError } from 'mongodb';

import { route as userRoute } from "./routes/users";
import { route as authRoute } from "./routes/auth";



const app = express();


dotenv.config();

const mongoUrl = process?.env?.MONGO_URL;
if(mongoUrl) {
    mongoose.connect(mongoUrl,  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err: MongoError) => {
        if(err) {
            console.log('Unable to connect to the server. Please start the server. Error:', err);
        } else {
            console.log("Connected to MongoDB");
        }
    });
} else {
    throw new Error("No URL to MongoDB are provided! Please use ENV MONGO_URL to provide a connection string");
}

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);


app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to FireAPI...");
});

app.listen(8800, () => {
    console.log("Backend server is running...");
});