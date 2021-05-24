import { createContext, useReducer } from "react";
import AuthReducer, { INITIAL_STATE, IAuthState } from "./AuthReducer";

interface IAuthContext extends IAuthState {
    dispatch?: React.Dispatch<any>;
}

export const AuthContext = createContext<IAuthContext>(INITIAL_STATE);


const AuthContextProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>{ children } 
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;