import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";



export  const UnAuthenticatedRoute = ({ children, ...rest })  => {
  const  isAuthenticated  = useAuth();

  return (
    <Route {...rest}>
      { isAuthenticated ? (
        <Redirect to="/" />
      ) : children
      }
    </Route>
  );
};

UnAuthenticatedRoute.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

