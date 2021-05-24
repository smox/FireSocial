import express, { Response } from "express";
import multer from "multer";
import RequestWithUser from "../interfaces/RequestWithUser";
import authMiddleware from "../middleware/auth.middleware";
import { buildSuccessMessage, buildUnhandledRestError } from "../utils.rest";
import { v4 as uuidv4 } from 'uuid';


const imageDirectory = process?.env?.IMAGE_DIRECTORY ? process.env.IMAGE_DIRECTORY : "/var/FireSocialAPI/images"

export const route = express.Router();
route.use(authMiddleware);


const storage = multer.diskStorage({
    destination: (request: RequestWithUser, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) => {
        callback(null, imageDirectory);
    },
    filename: (request: RequestWithUser, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
        callback(null, `${uuidv4()}.${ file.mimetype.split("/")[file.mimetype.split("/").length-1] }`);
    }
});

const upload = multer({storage});

route.post("/", upload.single('file'), (request: RequestWithUser, response: Response) => {
    try {
        return buildSuccessMessage(request.file, request, response, "File uploaded successfully!", "success.fileupload");
    } catch (error) {
        return buildUnhandledRestError(error, request, response);
    }
});
