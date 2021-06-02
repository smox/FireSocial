import express, { Response } from "express";
import { Types } from "mongoose";
import RequestWithUser from "../interfaces/RequestWithUser";
import authMiddleware from "../middleware/auth.middleware";
import Conversation from "../models/Conversation";
import { buildSuccessMessage, buildUnhandledRestError, buildValError } from "../utils.rest";

export const route = express.Router();
route.use(authMiddleware);

// New Conversation
route.post("/", async (request: RequestWithUser, response: Response) => {
    const receiverId = request.body.receiverId;
    console.info(`CreateNewConversation with receiverId: ${receiverId}`);

    if(!(Types.ObjectId.isValid(receiverId) || Conversation.findById(receiverId))) {
        return buildValError(request, response, "Receiver with ID cannot be found", "User.notFound");
    }

    const newConversation = new Conversation({
        members: [ request.user._id, request.body.receiverId ]
    })

    try {
        return buildSuccessMessage(await newConversation.save(), request, response, "Conversation successfully saved", "success.conversation.new");
    } catch (error) {
        return buildUnhandledRestError(error, request, response);
    }
});

// get Conversation for user
route.get("/", async (request: RequestWithUser, response: Response) => {
    try {
        console.info(`GetNewConversation ${request.user._id}`);

        return buildSuccessMessage(await Conversation.find({
            members: { $in: [ String(request.user._id) ]}
        }), request, response, "Conversation successfully fetched", "success.conversation.fetch")
    } catch (error) {
        return buildUnhandledRestError(error, request, response);
    }


});