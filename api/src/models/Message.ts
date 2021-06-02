import mongoose from "mongoose";

export interface IMessage {
    conversationId: string;
    senderId: string;
    text: string;
}

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: String
    },
    senderId: {
        type: String
    },
    text: {
        type: String
    }
},
{ timestamps: true });

const messageModel = mongoose.model<IMessage & mongoose.Document>('Message', messageSchema);
export type Message = typeof messageModel;
export default messageModel;