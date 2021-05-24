import { ACTIONS } from "./AuthActions";
import IRESTResult, { IRESTError, IRESTSuccess } from "../interfaces/models/IRestResult";
import IUser from "../interfaces/models/IUser";

export interface IAuthState {
    user?: IUser;
    isFetching: boolean;
    error?: IRESTError;
}

export const INITIAL_STATE: IAuthState = {
    user: undefined,
    isFetching: false,
    error: undefined
};

const AuthReducer = (state: IAuthState, action: { type: string, payload: any }): IAuthState => {
    console.log(`Call reducer: ${action.type}`);
    switch(action.type) {
        case ACTIONS.REGISTER_PENDING:
        case ACTIONS.LOGIN_PENDING:
        case ACTIONS.FETCH_USER_INFO_PENDING:
            return {
                ...state,
                user: undefined,
                isFetching: true,
                error: undefined
            }

        case ACTIONS.REGISTER_SUCCESS:
        case ACTIONS.LOGIN_SUCCESS:
        case ACTIONS.FETCH_USER_INFO_SUCCESS:
            return {
                ...state,
                user: (((action.payload as IRESTResult).result as IRESTSuccess).get) as IUser,
                isFetching: false,
                error: undefined
            }

        case ACTIONS.REGISTER_FAILURE:
        case ACTIONS.LOGIN_FAILURE:
        case ACTIONS.FETCH_USER_INFO_FAILURE: 
            return {
                ...state,
                isFetching: false,
                error: (action.payload as IRESTError)
            }

        case ACTIONS.CLEAR_USER: 
            return {
                ...state,
                user: undefined
            }
    }
    return {...state};
}

export default AuthReducer;