import RequestWithUser from "./interfaces/RequestWithUser";
import { Response } from "express";
import RESTResult, { RESTError } from "./interfaces/RESTResult";

// Type deklarations
interface RESTRequest {
    headers: typeof RequestWithUser.rawHeaders,
    params: typeof RequestWithUser.params,
    body: typeof RequestWithUser.body
}

// Helper Methods
const mapRequest = ({ rawHeaders, params, body }: RequestWithUser): RESTRequest => ({ headers: rawHeaders, params, body });

const buildError = (request: RequestWithUser, response: Response, message: string, key: string, type: string) => {
    return response.status(type === "AuthError" ? 401 : 400).json({
        success: false,
        message,
        result: {
          type,
          key,
          message,
          request: mapRequest(request)
        } as RESTError
    } as RESTResult);
}


// SUCCESS Message
export const buildSuccessMessage = (result: any, request: RequestWithUser, response: Response, message: string, key: string) => {
    return response.status(200).json({
        success: true,
        message,
        result: {
            key,
            message,
            request: mapRequest(request),
            get: result
        }
    } as RESTResult)
}

// Errors
export const buildUnhandledRestError = (error: any, request: RequestWithUser, response: Response) => {
    return buildUnhandledError(error, request, response, "RestError");
}

export const buildUnhandledAuthError = (error: any, request: RequestWithUser, response: Response) => {
    return buildUnhandledError(error, request, response, "AuthError");
}

export const buildValError = (request: RequestWithUser, response: Response, message: string, key: string) => {
    return buildError(request, response, message, key, "ValError");
}

export const buildAuthError = (request: RequestWithUser, response: Response, message: string, key: string) => {
    return buildError(request, response, message, key, "AuthError");
}

export const buildUnhandledError = (error: any, request: RequestWithUser, response: Response, type: string) => {
    return response.status(type === "AuthError" ? 403 : 500).json({
        success: false,
        message: "An unhandled error occured",
        result: {
            type: typeof error,
            message: String(error),
            key: "unhandled.rest.error",
            request: mapRequest(request)
        }
    } as RESTResult);
}
