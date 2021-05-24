import React from "react";
import axios from "axios";

export const ACTIONS = {
    FETCH_USER_INFO_PENDING: "FETCH_USER_INFO/PENDING",
    FETCH_USER_INFO_SUCCESS: "FETCH_USER_INFO/SUCCESS",
    FETCH_USER_INFO_FAILURE: "FETCH_USER_INFO/ERROR",
    REGISTER_PENDING: "REGISTER/PENDING",
    REGISTER_SUCCESS: "REGISTER/SUCCESS",
    REGISTER_FAILURE: "REGISTER/ERROR",
    LOGIN_PENDING: "LOGIN/PENDING",
    LOGIN_SUCCESS: "LOGIN/SUCCESS",
    LOGIN_FAILURE: "LOGIN/ERROR",
    LIKE_POST_PENDING: "LIKE_POST/PENDING",
    LIKE_POST_SUCCESS: "LIKE_POST/SUCCESS",
    LIKE_POST_FAILURE: "LIKE_POST/ERROR",
    UNLIKE_POST_PENDING: "UNLIKE_POST/PENDING",
    UNLIKE_POST_SUCCESS: "UNLIKE_POST/SUCCESS",
    UNLIKE_POST_FAILURE: "UNLIKE_POST/ERROR",
    CLEAR_USER: "LOGOUT/CLEAR_USER"
}

export const getUserInfo = async (dispatch: React.Dispatch<any>) => {
    dispatch({ type: ACTIONS.FETCH_USER_INFO_PENDING });
    try {
        let response = await axios.get("/api/user");
        dispatch({ type: ACTIONS.FETCH_USER_INFO_SUCCESS, payload: response.data});
    } catch (error) {
        dispatch({ type: ACTIONS.FETCH_USER_INFO_FAILURE, payload: error.response.data.result});
    }
}

export const login = async (username: string, password: string, dispatch: React.Dispatch<any>, successCallback: Function ) => {
    dispatch({ type: ACTIONS.LOGIN_PENDING });
    try {
        let response = await axios.post("/api/auth/login", { username, password });
        dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: response.data});
        successCallback();
    } catch (error) {
        dispatch({ type: ACTIONS.LOGIN_FAILURE, payload: error.response.data.result});
    }
};

export const register = async (username: string, email: string, password: string, dispatch: React.Dispatch<any>, successCallback: Function ) => {
    dispatch({ type: ACTIONS.REGISTER_PENDING });
    try {
        let response = await axios.post("/api/auth/register", { username, email, password });
        dispatch({ type: ACTIONS.REGISTER_SUCCESS, payload: response.data});
        successCallback();
    } catch (error) {
        dispatch({ type: ACTIONS.REGISTER_FAILURE, payload: error.response.data.result});
    }
};

export const clearUser = (dispatch: React.Dispatch<any>) => {
    dispatch({ type: ACTIONS.CLEAR_USER })
};