import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";



export  const AuthenticatedRoute = ({ children, ...rest })  => {
  const { pathname, search } = useLocation();
  const  isAuthenticated  = useAuth();

  return (
    <Route {...rest}>
      { isAuthenticated ? (
        children
      ) : (
        <Redirect to={
          `/login?redirect=${pathname}${search}`
        } />
      )}
    </Route>
  );
};

AuthenticatedRoute.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};


export const querystring = (name, url = window.location.href) => {
    name = name.replace(/[[]]/g, "\\$&");
  
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
    const results = regex.exec(url);
  
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return "";
    }
  
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };
