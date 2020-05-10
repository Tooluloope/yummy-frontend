import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import { querystring } from "./authenticatedRoutes";



export  const UnAuthenticatedRoute = ({ children, ...rest })  => {
  const  isAuthenticated  = useAuth();
  const path =  querystring("redirect");
             
  // console.log(path);
  // // history.push(redirect);

  return (
    <Route {...rest}>
      { isAuthenticated ? (
        <Redirect to={`${path ? path : "/"}`} />
      ) : children
      }
    </Route>
  );
};

UnAuthenticatedRoute.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

