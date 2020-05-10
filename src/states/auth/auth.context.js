import React, {createContext, useReducer} from "react";
import PropTypes from "prop-types";
import { getStateFromLocalStorage,removeStateFromLocalStorage, stateToLocalStorage } from "../../components/utils";



const initialState = getStateFromLocalStorage("user") ? getStateFromLocalStorage("user") : {
    user: null,
    isAuthenticated: false,
    token: localStorage.getItem("token"),
  };

export const userContext = createContext(initialState);

const reducer = (state, action) => {
    
    const { type, payload } = action;
    switch (type) {
          case "LOGOUT_SUCCESS":
            removeStateFromLocalStorage("user");
            localStorage.removeItem("token");
            localStorage.removeItem("isAuthenticated", JSON.stringify(false));
            return {
              ...state,
              isAuthenticated: false,
              user: null,
            };
        case "LOGIN_SUCCESS":
          stateToLocalStorage("user", payload);
          localStorage.setItem("token", payload.token);
          localStorage.setItem("isAuthenticated", JSON.stringify(true));
          return {
            ...state,
            user: payload.user,
            isAuthenticated: true,
            ...payload
          };
        case "REGISTER_SUCCESS":
          stateToLocalStorage("user", payload);
          localStorage.setItem("token", payload.token);
          localStorage.setItem("isAuthenticated", JSON.stringify(true));
          return {
            ...state,
            user: payload.user,
            isAuthenticated: true,
            ...payload
          };
        case "AUTH_ERROR":
        case "REGISTER_FAIL":
        case "LOGIN_FAIL":
          removeStateFromLocalStorage("user");
          localStorage.removeItem("token");
          localStorage.removeItem("isAuthenticated", JSON.stringify(false));
          return {
            ...state,
            isAuthenticated: false,
            user: null,
            token: null,
          };
        default:
          return state;
}};

export const User = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <userContext.Provider value={{ state, dispatch }}>
        {children}
      </userContext.Provider>
    );};


    User.propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ])
    };


