import React from "react";
import { Navigate } from "react-router";
import { IProtectedPage } from "../interfaces/IProtectedPage";

export const ProtectedPage: React.FC<IProtectedPage> = ({ children, redirectTo }) => {
  var authenticated = true;
  //поменять проверку аутентификации
  return authenticated ? <>{children}</> : <Navigate to={redirectTo} />;
};
