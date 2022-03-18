import React from "react";
import { Navigate } from "react-router";
import { IProtectedPage } from "../interfaces/IProtectedPage";
import { useTypedSelector } from "../redux/hooks/useTypedSelector";

export const ProtectedPage: React.FC<IProtectedPage> = ({ children, redirectTo }) => {
  const authState = useTypedSelector((state) => state.auth);

  //поменять проверку аутентификации
  return authState.state && authState.state.id ? <>{children}</> : <Navigate to={redirectTo} />;
};
