import { Response } from "express";
import express from "express";
import bcrypt from "bcrypt";
import RequestWithUser from "../interfaces/RequestWithUser";
import authMiddleware from "../middleware/auth.middleware";
import { Types } from "mongoose";

import User, { IUser } from '../models/User';
import { buildSuccessMessage, buildUnhandledRestError, buildValError } from "../utils.rest";

export const route = express.Router();
route.use(authMiddleware);


// get user
route.get("/info/:id", async (request: RequestWithUser, response: Response) => {
    try {
        if(!request.param.id) {
            request.user.password = undefined;
            return buildSuccessMessage(request.user, request, response, "User information successfully fetched", "success.user.info");
        }
        const user = await User.findById(request.param.id);
        if(!user) {
            return buildValError(request, response, "User with ID cannot be found", "user.notFound");
        }
        user.password = undefined;
        return buildSuccessMessage(user, request, response, "User information successfully fetched", "success.user.info");
    } catch ( error ) {
        return buildUnhandledRestError(error, request, response);
    }
});

/*
 * Gets the userinformation by ID or Username query. 
 * If no query param is provided the Endpoint returns the information from the current user
 */
route.get("/", async (request: RequestWithUser, response: Response) => {
    try {

        if(request.query.id) {
            const user = await User.findById(request.query.id);
            if(user) {
                user.password = undefined;
                return buildSuccessMessage(user, request, response, "User fetched successfully by ID", "success.user.id");
            }
            return buildValError(request, response, "User with ID cannot be found", "user.notFound");
        } else if(request.query.username) {
            const user = await User.findOne({ username: request.query.username })
            if(user) {
                user.password = undefined;
                return buildSuccessMessage(user, request, response, "User fetched successfully by ID", "success.user.id");
            }
            return buildValError(request, response, "User with ID cannot be found", "user.notFound");
        }

        const user = request.user;
        user.password = undefined;
        return buildSuccessMessage(user, request, response, "User information successfully fetched", "success.user.info");

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
            return buildValError(request, response,  "UserId is missing", "userid.missing");
        }

        if(String(user._id) === userIdToFollow) {
            return buildValError(request, response, "You cannot follow yourself", "following.yourself");
        }
    
        if( user.following.includes(userIdToFollow)) {
            return buildValError(request, response,  "You already follow this user", "following.already");
        }

        if(!Types.ObjectId.isValid(userIdToFollow)) {
            return buildValError(request, response, "UserId not valid", "userid.invalid");
        }

        const userToFollow = await User.findById(userIdToFollow);
        if(!userToFollow) {
            return buildValError(request, response, "UserId does not exist", "userid.notexists");
        }

        await user.updateOne({ $push: { following: userIdToFollow }});
        await userToFollow.updateOne({ $push: { followers: String(user._id) }})
        
        return buildSuccessMessage(userToFollow, request, response, "User successfully followed", "success.user.followed");

    } catch (error) {
        return buildUnhandledRestError(error, request, response);
    }
});

// unfollow a user
route.put("/unfollow", async (request: RequestWithUser, response: Response) => {
    try {

        let user = request.user;
        const userIdToFollow = request.body["userId"];

        if(!userIdToFollow) {
            return buildValError(request, response,  "UserId is missing", "userid.missing");
        }

        if(String(user._id) === userIdToFollow) {
            return buildValError(request, response, "You cannot unfollow yourself", "unfollowing.yourself");
        }
    
        if( !user.following.includes(userIdToFollow)) {
            return buildValError(request, response,  "You are not following this user", "unfollowing.notpossible");
        }

        if(!Types.ObjectId.isValid(userIdToFollow)) {
            return buildValError(request, response, "UserId not valid", "userid.invalid");
        }

        const userToFollow = await User.findById(userIdToFollow);
        if(!userToFollow) {
            return buildValError(request, response, "UserId does not exist", "userid.notexists");
        }

        await user.updateOne({ $pull: { following: userIdToFollow }});
        await userToFollow.updateOne({ $pull: { followers: String(user._id) }})
        
        return buildSuccessMessage(userToFollow, request, response, "User successfully unfollowed", "success.user.unfollowed");

    } catch (error) {
        return buildUnhandledRestError(error, request, response);
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

route.get("/friends/:id", async (request: RequestWithUser, response: Response) => {
    const paramId = request.params.id;
    console.info(`REST Call: GetFriends ${paramId}`);

    let user;
    try {
        if(paramId) {
            user = await User.findById(paramId);
            if(!user) {
                return buildValError(request, response, `Cannot find User with ID ${paramId}`, "user.notFound");
            } 
        } else {
            user = request.user;
        }
        const friendIds = user.following;
        return buildSuccessMessage(
            await User.find().where("_id").in(friendIds).exec(), 
            request, response, "Friends successfully fetched", "success.friendlist");
    } catch (error) {
        return buildUnhandledRestError(error, request, response);
    }
})

// delete a user
route.delete("/", async (req: RequestWithUser, res: Response) => {
    try {
        return buildSuccessMessage(await User.findByIdAndDelete(req.user.id), req, res, "User deleted successfully", "success.user.deleted");
    } catch (error) {
        return buildUnhandledRestError(error, req, res);
    }
});