import IPost from "./IPost";
import IUser from "./IUser";

interface IRESTBase {
    key: string;
    message: string;
    request: any
}

export interface IRESTSuccess extends IRESTBase {
    get: IPost | IPost[] | IUser | IUser[];
}

export interface IRESTError extends IRESTBase {
    type: string;
}

export default interface RESTResult {
    success: boolean;
    message: string | undefined;
    result: IRESTSuccess | IRESTError;
}