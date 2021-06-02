import express, { response, Response } from "express";
import { Types } from "mongoose";
import RequestWithUser from "../interfaces/RequestWithUser";
import authMiddleware from "../middleware/auth.middleware";
import Conversation from "../models/Conversation";
import Message from "../models/Message";
import { buildSuccessMessage, buildUnhandledRestError, buildValError } from "../utils.rest";

export const route = express.Router();
route.use(authMiddleware);

route.post("/", async (request: RequestWithUser, response: Response) => {

    try {
        const { conversationId, text } = request.body;
    
        if(!(Types.ObjectId.isValid(conversationId) && Conversation.findById(conversationId))) {
            return buildValError(request, response, "Conversation cannot be found", "conversation.notFound");
        }
    
        return buildSuccessMessage(
            await new Message({
                conversationId,
                senderId: request.user._id,
                text
            }).save(), request, response, "Conversation saved successfully", "success.conversation.saved");
    } catch (error) {
        return buildUnhandledRestError(error, request, response);
    }

});

route.get("/:conversationId", async (request: RequestWithUser, response: Response) => {
    const conversationId = request.params.conversationId;
    console.info(`GET all messages by conversationId ${conversationId}`);

    try {
        if(!(conversationId && Types.ObjectId.isValid(conversationId))) {
            return buildValError(request, response, `Conversation ID ${conversationId} is invalid`, "conversation.invalidId");
        }
        return buildSuccessMessage(await Message.find({ conversationId }), request, response, "Messages successfully fetched", "messages.fetched");
    } catch (error) {
        return buildUnhandledRestError(error, request, response);
    }

});
