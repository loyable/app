import React, { useReducer } from "react";

import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

import setAuthToken from "../../utils/setAuthToken";

import AuthContext from "./authContext";
import authReducer from "./authReducer";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  LOGOUT,
  AUTH_ERROR,
  CLEAR_ERRORS
} from "../types";

const AuthState = props => {
  const initialState = {
    token: null,
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }

    try {
      const res = await axios.get("/auth");

      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: res.data
      });
    }
  };

  // Register
  const register = async phone => {
    try {
      await axios.post("/auth", { phone });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data
      });
    }
  };

  // Login
  const login = async ({ phone, verification }) => {
    try {
      const res = await axios.post("/auth", { phone, verification });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        register,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
