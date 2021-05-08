import { Request, Response } from "express";
import express from "express";
import bcrypt from "bcrypt";

export const route = express.Router();

const User = require("../models/User");

route.get("/", (req: Request, res: Response) => {
    res.send("Auth Route...");
});

route.get("/register", async (req: Request, res: Response) => {
    const user = await new User({
        username: "John",
        email: "john@gmail.com",
        password: "123456"
    });
    await user.save();
    res.send("OK");
});

route.post("/register", async (req: Request, res: Response) => {

    const salt = await bcrypt.genSalt(10);
    let user = await new User({
        username: req.body["username"],
        email: req.body["email"],
        password: await bcrypt.hash(req.body["password"], salt),
    });

    try {
        user = await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

route.post("/login", async (req: Request, res: Response) => {

    try {
        const user = await User.findOne({ email: req.body["email"] });
        !user && res.status(404).send("user not found");

        const validPassword = await bcrypt.compare(req.body["password"], user.password);
        !validPassword && res.status(400).json("Wrong password");

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});