import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ isAuthenticated, children }) => {
  if (isAuthenticated) {
    return children;
  } else {
    //how to navigate to other page using react-router-dom?
    return <Navigate to="/login" />;
  }
};

export default Protected;
