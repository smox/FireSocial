import { IPost } from "../models/Post";
import { IUser } from "../models/User";
import RequestWithUser from "./RequestWithUser";


interface RESTBase {
    key: string;
    message: string;
    request: Request | RequestWithUser;
}

export interface RESTSuccess extends RESTBase {
    get: IPost | IPost[] | IUser | IUser[];
}

export interface RESTError extends RESTBase {
    type: string;
}

export default interface RESTResult {
    success: boolean;
    message: string | undefined;
    result: RESTSuccess | RESTError;
}