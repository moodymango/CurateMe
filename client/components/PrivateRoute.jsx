import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext.jsx";
import { Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
