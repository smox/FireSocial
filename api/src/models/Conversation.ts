import mongoose from "mongoose";

export interface IConversation {
    members: string[]
}

const conversationSchema = new mongoose.Schema({
    members: {
        type: Array,
    }
},
{ timestamps: true });

const conversationModel = mongoose.model<IConversation & mongoose.Document>('Conversation', conversationSchema);
export type Conversation = typeof conversationModel;
export default conversationModel;