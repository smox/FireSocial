import mongoose from "mongoose";

export interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string | undefined;
    coverPicture: string;
    profilePicture: string;
    following: string[];
    followers: string[];
    isAdmin: boolean;
    desc: string;
    city: string;
    from: string;
    relationship: number;
}

const userSchema = new mongoose.Schema({
        username: {
            type:String,
            require: true,
            min: 3,
            max: 20,
            unique: true
        },
        email: {
            type: String,
            require: true,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        coverPicture: {
            type: String,
            default: ""
        },
        profilePicture: {
            type: String,
            default: ""
        },
        following: {
            type: Array,
            default: []
        },
        followers: {
            type: Array,
            default: []
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        desc: {
            type: String,
            max: 50
        },
        city: {
            type: String,
            max: 50
        },
        from: {
            type: String,
            max: 50
        },
        relationship: {
            type: Number,
            enum: [1, 2, 3]
        }
    },
    { timestamps: true }
);
const userModel = mongoose.model<IUser & mongoose.Document>('User', userSchema);
export type User = typeof userModel;
export default userModel;