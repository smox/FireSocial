import { Request, Response } from "express";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import ITokenData from "../interfaces/TokenData";
import IDataStoredInToken from "../interfaces/DataStoredInToken";

export const route = express.Router();

import User, { IUser } from "../models/User";
import { buildSuccessMessage, buildUnhandledRestError, buildValError } from "../utils.rest";

const createToken = (user: IUser): ITokenData => {
    const expiresIn = process.env.AUTH_TOKEN_EXPIRATION_TIME ? Number(process.env.AUTH_TOKEN_EXPIRATION_TIME) : 60 * 60; // an hour
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
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}; Path=/`;
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
            return buildSuccessMessage(user, req, res, "User successfully registered", "success.register");

        } catch (err) {
            return buildUnhandledRestError(err, req, res)
        }
    }

});

route.post("/login", async (req: Request, res: Response) => {

    let user:IUser | null = null;
    if(req.body["username"]) {
        user = await User.findOne({ username: req.body["username"] });
        if(!user) {
            user = await User.findOne({ email: req.body["username"] }); 
        }
    } else if (req.body["email"]) {
        user = await User.findOne({ email: req.body["email"] });
    }

    if(user) {
        const validPassword = await bcrypt.compare(req.body["password"], user.password!);
        if(validPassword) {
            user.password = undefined;
            const tokenData = createToken(user);
            res.setHeader('Set-Cookie', [createCookie(tokenData)]);
            return buildSuccessMessage(user, req, res, "Authentication successfully", "auth.success");  
        }
    }
    return buildValError(req, res, "User not found or password incorrect", "login.incorrect");
});

