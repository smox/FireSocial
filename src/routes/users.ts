import { Request, Response } from "express";
import express from "express";
import bcrypt from "bcrypt";

const User = require("../models/User");

export const route = express.Router();


route.get("/", (req: Request, res: Response) => {
    res.send("Users Route...");
});


// get user
// follow a user
// unfollow a user

// update a user
route.put("/:id", async (req: Request, res: Response) => {
    try {
        if( req.body["userId"] === req.params.id /* || req.user.isAdmin */ ) {
            if(req.body["password"]) { 
                const salt = await bcrypt.genSalt(10);
                req.body["password"] = await bcrypt.hash(req.body["password"], salt);
            
                const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
            }
        } else {
            return res.status(403).json("You can update only your account");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// delete a user