import mongoose from "mongoose";

export interface IPost {
    userId: string;
    title: string;
    text: string;
    img: string;
    likes: string[]
}

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        min: 1,
        max: 100,
        required: true
    },
    text: {
        type: String,
        min: 1,
        max: 500,
        required: true
    },
    img: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    }
},
{ timestamps: true });

const postModel = mongoose.model<IPost & mongoose.Document>('Post', postSchema);
export type Post = typeof postModel;
export default postModel;