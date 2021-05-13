
import express, { Response } from "express";
import RequestWithUser from "../interfaces/RequestWithUser";
import authMiddleware from "../middleware/auth.middleware";

import { Types } from "mongoose";

import Post from "../models/Post";
import { buildSuccessMessage, buildValError, buildUnhandledRestError } from "../utils.rest";

export const route = express.Router();
route.use(authMiddleware);

const entityType = "post";

// create a post
route.post("/", async (request: RequestWithUser, response: Response) => {
    console.info(`REST Call: CreatePost`);
    try {

        // Code duplication BEGIN
        const postRequest = request.body;
        if(!postRequest.title) {
            return buildValError(request, response, "No title provided", "missing.body.title");
        }

        postRequest.title = postRequest.title.trim();
        if(postRequest.title.length < 5 || postRequest.title.length > 100) {
            return buildValError(request, response, "Titles of posts must be between 5 and 100 characters long", "invalid.body.title.length");   
        }     

        if(!postRequest.text || postRequest.text.length < 5) {
            return buildValError(request, response, "No text provied", "missing.body.text");  
        }

        postRequest.text = postRequest.text.trim();
        if(postRequest.text.length < 5 || postRequest.text.length > 500) {
            return buildValError(request, response, "Texts of posts must be between 5 and 500 characters long", "invalid.body.text.length");    
        }
        // Code duplication END           

        const newPost = new Post({
            userId: request.user.id,
            title: postRequest.title,
            text: postRequest.text,
            img: postRequest.img
        });

        return buildSuccessMessage(await newPost.save(), request, response, `${entityType} successfully saved`, `success.${entityType}.saved`);
    } catch (error) {
        return buildUnhandledRestError(error, request, response);
    }
});


// update a post
route.put("/:id", async (request: RequestWithUser, response: Response) => {
    console.info(`REST Call: UpdatePostByUserId ${request.params.id}`);
    try {
        const postIdToUpdate = request.params.id;

        if(!postIdToUpdate || !Types.ObjectId.isValid(postIdToUpdate)) {
            return buildValError(request, response, `${entityType} cannot be updated because \'${postIdToUpdate}\' is invalid or missing`, `missingOrInvalid.id`);
        }

        const postToUpdate = await Post.findById(postIdToUpdate);
        if(!postToUpdate) {
            return buildValError(request, 
                response, `
                ${entityType} cannot be updated because ${entityType} with ID \'${postIdToUpdate}\' cannot be found`, 
                `notfound.${entityType}`); 
        }       

        const user = request.user;
        if( !(String(user._id) === postToUpdate!.userId || user.isAdmin) ) {
            return buildValError(request, response, "Only admins are able to edit posts from other users", "not.authorized"); 
        }       


        // Code duplication BEGIN
        const postRequest = request.body;
        if(!postRequest.title) {
            return buildValError(request, response, "No title provided", "missing.body.title");
        }

        postRequest.title = postRequest.title.trim();
        if(postRequest.title.length < 5 || postRequest.title.length > 100) {
            return buildValError(request, response, "Titles of posts must be between 5 and 100 characters long", "invalid.body.title.length");   
        }     

        if(!postRequest.text || postRequest.text.length < 5) {
            return buildValError(request, response, "No text provied", "missing.body.text");  
        }

        postRequest.text = postRequest.text.trim();
        if(postRequest.text.length < 5 || postRequest.text.length > 500) {
            return buildValError(request, response, "Texts of posts must be between 5 and 500 characters long", "invalid.body.text.length");    
        } 
        // Code duplication END

        const result = await postToUpdate!.updateOne({ $set: {
            title: postRequest.title,
            text: postRequest.text,
            img: postRequest.img
        }});

        const updatedEntity = await Post.findById(postIdToUpdate);
        if(result.nModified === 1) {
            return buildSuccessMessage(updatedEntity, request, response, `${entityType} successfully updated`, `success.${entityType}.updated`);
        }

        return response.status(500).json({ errorMessage: "An unexpected error occured. No changes was triggered" });

    } catch (error) {
        return buildUnhandledRestError(error, request, response);
    }
});

// delete a post
route.delete("/:id", async (request: RequestWithUser, response: Response) => {
    console.info(`REST Call: DeletePostByUserId with ID: ${request.params["id"]}`);
    try {
        const idToDelete = request.params.id;
        if(idToDelete) {
            const entityToDelete = await Post.findById(idToDelete);
            console.log(entityToDelete);
            if(entityToDelete) {
                console.log(entityToDelete.userId);
                console.log(String(request.user._id));
                console.log(entityToDelete.userId === String(request.user._id));
                console.log(entityToDelete.userId == String(request.user._id));
                if(entityToDelete.userId === String(request.user._id)) {
                    const result = await Post.deleteOne({ _id: idToDelete });
                    console.log(result);
                    if(result.ok) {
                        return buildSuccessMessage(entityToDelete, request, response, `${entityType} successfully deleted`, "deleted.successfully");
                    }
                } else {
                    return buildValError(request, response, `${entityType} cannot be deleted`, "not.authorized");
                }
            } else {
                return buildValError(request, response, `No ${entityType} to delete with ID ${idToDelete} found`, "missing.param.id");
            }
        } else {
            return buildValError(request, response, "No ID parameter provided", "missing.param.id");
        }
    } catch (error) {
        console.log(error);
        return buildUnhandledRestError(error, request, response);
    }
});


// like a post
route.put("/:id/like", async (request: RequestWithUser, response: Response) => {
    const postIdToLike = request.params.id;
    const userId = String(request.user._id);
    console.info(`REST Call: LikePost with ID ${postIdToLike}`);

    try {
        if(!postIdToLike || !Types.ObjectId.isValid(postIdToLike)) {
            return buildValError(
                request, 
                response, 
                `The ID \'${postIdToLike}\' of the ${entityType} you want to like is missing or invalid`, 
                "missingOrInvalid.id"
            );
        }
        const postToLike = await Post.findById(postIdToLike);
        if(!postToLike) {
            return buildValError(request, response, `${entityType} with ID ${postIdToLike} you want to like is missing`, "missing.id");
        }

        if(postToLike.userId === userId) {
            return buildValError(request, response, `You cannot like your own ${entityType} with the ID ${postIdToLike}`, "ownpost.liked");
        }

        if( postToLike.likes.includes(userId) ) {
            return buildValError(request, response, `You already like the ${entityType} with the ID ${postIdToLike}`, "already.liked");
        }

        const result = await postToLike.updateOne({ $push: { likes: userId } });
        return buildSuccessMessage(result, request, response, "Post liked", "post.liked");
    } catch (error) {
        return buildUnhandledRestError(error, request, response);
    }
});

// unlike a post
route.put("/:id/unlike", async (request: RequestWithUser, response: Response) => {
    const postIdToLike = request.params.id;
    const userId = String(request.user._id);
    console.info(`REST Call: LikePost with ID ${postIdToLike}`);

    try {
        if(!postIdToLike || !Types.ObjectId.isValid(postIdToLike)) {
            return buildValError(
                request, 
                response, 
                `The ID \'${postIdToLike}\' of the ${entityType} you want to like is missing or invalid`, 
                "missingOrInvalid.id"
            );
        }
        const postToLike = await Post.findById(postIdToLike);
        if(!postToLike) {
            return buildValError(request, response, `${entityType} with ID ${postIdToLike} you want to like is missing`, "missing.id");
        }

        if( !postToLike.likes.includes(userId) ) {
            return buildValError(request, response, `You've never been liked '${entityType} with the ID ${postIdToLike}`, "already.liked");
        }

        const result = await postToLike.updateOne({ $pull: { likes: userId } });
        return buildSuccessMessage(result, request, response, "Post unliked", "post.unliked");
    } catch (error) {
        return buildUnhandledRestError(error, request, response);
    }
});

route.get("/timeline", async (request: RequestWithUser, response: Response) => {
    console.info(`REST Call: GetTimeline`);
    try {
        const ids = [ request.user._id ].concat(request.user.following);
        const posts = await Post.find().where("userId").in(ids).exec();
        return buildSuccessMessage(posts, request, response, "Timeline posts successfilly fetched", "timeline.success") ;   
    } catch(error) {
        return buildUnhandledRestError(error, request, response);
    }
});

// get all posts by user id
route.get("/:userId", async (request: RequestWithUser, response: Response) => {
    console.info(`REST Call: GetAllPostByUserId ${request.params.userId}`);
    try {
        
        const userId = request.params.userId;
        if(!userId) {
            return buildValError(request, response, "Parameter userID not provided", "missing.param.userId");
        }
    
        return buildSuccessMessage (
            await Post.find({ userId }), 
            request, 
            response, 
            `Successfully fetched all ${entityType}s by userId`, 
            "success.get.all"
        );

    } catch (error) {
        return buildUnhandledRestError(error, request, response);
    }
});