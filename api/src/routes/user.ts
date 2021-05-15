import { Response } from "express";
import express from "express";
import bcrypt from "bcrypt";
import RequestWithUser from "../interfaces/RequestWithUser";
import authMiddleware from "../middleware/auth.middleware";
import { Types } from "mongoose";

import User from '../models/User';
import { buildSuccessMessage, buildUnhandledRestError, buildValError } from "../utils.rest";

export const route = express.Router();
route.use(authMiddleware);


// get user
route.get("/info", async (request: RequestWithUser, response: Response) => {
    try {
        return buildSuccessMessage(request.user, request, response, "User information successfully fetched", "success.user.info");
    } catch ( error ) {
        return buildUnhandledRestError(error, request, response);
    }
});

// follow a user
route.put("/follow", async (request: RequestWithUser, response: Response) => {
    try {

        let user = request.user;
        const userIdToFollow = request.body["userId"];

        if(!userIdToFollow) {
            return response.status(500).json({ errorMessage: "UserId is missing" })
        }

        if(String(user._id) === userIdToFollow) {
            return response.status(403).json({ errorMessage: "You cannot follow yourself" });
        }
    
        if( user.following.includes(userIdToFollow)) {
            return response.status(500).json({ errorMessage: "You already follow this user" });
        }

        if(!Types.ObjectId.isValid(userIdToFollow)) {
            return response.status(500).json({ errorMessage: "UserId not valid" });
        }

        const userToFollow = await User.findById(userIdToFollow);
        if(!userToFollow) {
            return response.status(500).json({ errorMessage: "UserId does not exist" });
        }

        await user.updateOne({ $push: { following: userIdToFollow }});
        await userToFollow.updateOne({ $push: { followers: String(user._id) }})
        
        user = await User.findById(user._id);

        return buildSuccessMessage(user, request, response, "User successfully followed", "success.user.followed");

    } catch (error) {
        return buildUnhandledRestError(error, request, response);
    }
});

// unfollow a user
route.put("/unfollow", async (req: RequestWithUser, res: Response) => {
    try {

        let user = req.user;
        const userIdToFollow = req.body["userId"];

        if(!userIdToFollow) {
            return res.status(500).json({ errorMessage: "UserId is missing" })
        }

        if(String(user._id) === userIdToFollow) {
            return res.status(403).json({ errorMessage: "You cannot unfollow yourself" });
        }
    
        if( !user.following.includes(userIdToFollow)) {
            return res.status(500).json({ errorMessage: "You are not following this user" });
        }

        if(!Types.ObjectId.isValid(userIdToFollow)) {
            return res.status(500).json({ errorMessage: "UserId not valid" });
        }

        const userToFollow = await User.findById(userIdToFollow);
        if(!userToFollow) {
            return res.status(500).json({ errorMessage: "UserId does not exist" });
        }

        await user.updateOne({ $pull: { following: userIdToFollow }});
        await userToFollow.updateOne({ $pull: { followers: String(user._id) }})
        
        user = await User.findById(user._id);

        return buildSuccessMessage(user, req, res, "User successfully unfollowed", "success.user.unfollowed");

    } catch (error) {
        return buildUnhandledRestError(error, req, res);
    }
});

// update user
route.put("/", async (request: RequestWithUser, response: Response) => {
    try {

        const isAdmin = request.body["isAdmin"];
        const requestHigherPriviledges = isAdmin && !request.user.isAdmin
        if( requestHigherPriviledges ) {
            return buildValError(request, response, "You are not allowed to change your priviledges", "privilidgeChange.notAllowed");
        }
        
        if(request.body["password"]) { 
            const salt = await bcrypt.genSalt(10);
            request.body["password"] = await bcrypt.hash(request.body["password"], salt);
        }

        return buildSuccessMessage(
            await User.findByIdAndUpdate(request.user.id, { $set: request.body }), 
            request, 
            response, 
            "User successfully updated", 
            "success.user.updated"
        );
    } catch (err) {
        return buildUnhandledRestError(err, request, response);
    }
});

// delete a user
route.delete("/", async (req: RequestWithUser, res: Response) => {
    try {
        return buildSuccessMessage(await User.findByIdAndDelete(req.user.id), req, res, "User deleted successfully", "success.user.deleted");
    } catch (error) {
        return buildUnhandledRestError(error, req, res);
    }
});