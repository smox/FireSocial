import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import DataStoredInToken from '../interfaces/DataStoredInToken';
import RequestWithUser from '../interfaces/RequestWithUser';
import User from '../models/User';
import { buildAuthError, buildUnhandledAuthError } from '../utils.rest';

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {

  try {
    const cookies = request.cookies;
    if(!cookies || !cookies.Authorization) {
      return buildAuthError(request, response, "No Authorization Token provided", "token.missing");
    }
    const secret = process.env.JWT_SECRET!;
    const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
    const id = verificationResponse._id;
    const user = await User.findById(id);
    if (!user) {
      return buildAuthError(request, response, "Token cannot be assigned to a User, please issue a new one", "token.not.assignable");
    }

    request.user = user;
    next();

  } catch (error) {
    if(error.name === 'TokenExpiredError') {
      return buildAuthError(request, response, "Token expired! Please issue a new one", "token.expired")
    }
    return buildUnhandledAuthError(error, request, response);
  }
}
export default authMiddleware;