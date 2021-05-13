
import express, { Request, Response } from 'express';
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';  
import bodyParser from 'body-parser';  

import { MongoError } from 'mongodb';

import { route as userRoute } from "./routes/user";
import { route as postsRoute } from "./routes/posts";
import { route as authRoute } from "./routes/auth";



const app: express.Application = express();


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

if(!process.env.JWT_SECRET) {
    throw new Error("No JWT_SECRET provided! You have to define the ENV JWT_SECRET for ecrypting session tokens.");
}

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postsRoute);


app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to FireAPI...");
});

app.listen(8800, () => {
    console.log("Backend server is running...");
});