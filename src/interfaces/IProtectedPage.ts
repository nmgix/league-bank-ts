import React from "react";
import { To } from "react-router-dom";
export interface IProtectedPage {
  children: React.ReactNode;
  redirectTo: To;
}
