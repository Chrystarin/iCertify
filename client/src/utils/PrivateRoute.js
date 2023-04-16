import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./AuthContext";

function PrivateRoute({ roles, ownerId, ...rest }) {
  const { user } = useAuth();

  if (!user) {
    // if user is not logged in, redirect to login page
    return <Redirect to="/" />;
  }

  if (roles && roles.length > 0 && !roles.some(r => user.roles.includes(r))) {
    // if user is missing any of the required roles, redirect to home page
    return <Redirect to="/" />;
  }

  if (ownerId && user.id !== ownerId) {
    // if user is not the owner of the requested resource, redirect to home page
    return <Redirect to="/" />;
  }

  // if user is logged in and has the required roles and owns the requested resource, render the component
  return <Route {...rest} />;
}

export default PrivateRoute;