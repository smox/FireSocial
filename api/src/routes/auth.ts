import { Request, Response } from "express";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import ITokenData from "../interfaces/TokenData";
import IDataStoredInToken from "../interfaces/DataStoredInToken";

export const route = express.Router();

import User, { IUser } from "../models/User";
import { buildSuccessMessage } from "../utils.rest";

const createToken = (user: IUser): ITokenData => {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET!;
    const dataStoredInToken: IDataStoredInToken = {
        _id: user._id,
    };
    return {
        expiresIn,
        token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
}

const createCookie = (tokenData: ITokenData) => {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

route.get("/", (req: Request, res: Response) => {
    res.send("Auth Route...");
});

route.post("/register", async (req: Request, res: Response) => {

    const username = req.body["username"];
    const email = req.body["email"];
    const password = req.body["password"];

    if(!username || !email || !password) {
        res.status(500).json({
            errorMessage: "You have to provide a Username, an E-Mail Address and a Password to register an account!"
        });
    } else if(await User.findOne({ username })) {
        res.status(500).json({
            errorMessage: "Username already taken! Please consider another one"
        });
    } else if(await User.findOne({ email })) {
        res.status(500).json("E-Mail address already taken! Please consider another one");
    } else {

        const salt = await bcrypt.genSalt(10);
        let user = await new User({
            username: req.body["username"],
            email: req.body["email"],
            password: await bcrypt.hash(req.body["password"], salt),
        });

        try {
            user = await user.save();

            user!.password = undefined;
            const tokenData = createToken(user);
            res.setHeader('Set-Cookie', [createCookie(tokenData)])
            res.status(200).json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    }

});

route.post("/login", async (req: Request, res: Response) => {

    let user:IUser | null = null;
    if(req.body["username"]) {
        user = await User.findOne({ username: req.body["username"] });
        console.log(`User: ${user} found by username ${req.body["username"]}`);
    } else if (req.body["email"]) {
        user = await User.findOne({ email: req.body["email"] });
        console.log(`User: ${user} found by email ${req.body["email"]}`);
    }

    if(user) {

        const validPassword = await bcrypt.compare(req.body["password"], user.password!);
        if(validPassword) {

            user.password = undefined;
            const tokenData = createToken(user);
            res.setHeader('Set-Cookie', [createCookie(tokenData)]);
            return buildSuccessMessage({ user, tokenData }, req, res, "Authentication successfully", "auth.success");
            
        } else { 
            res.status(400).json({errorMessage: "User not found or password incorrect"});
        }

    } else {
        res.status(400).json({errorMessage: "User not found or password incorrect"});
    }
});

/*
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
});*/

/*
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
});*/

