import { defaultAction } from "./defaultType";

export interface UserState {
  id: string;
  phone: string;
  mail: string;
  names: {
    first: string;
    second: string;
    third: string;
  };
  img: string;
}

export interface AuthState {
  state: UserState | null;
  error: string;
}

export enum AuthTypes {
  AUTH_REQUEST = "AUTH_REQUEST",
  AUTH_SUCCESS = "AUTH_SUCCESS",
  AUTH_ERROR = "AUTH_ERROR",
  AUTH_RESET = "AUTH_ERROR",
  AUTH_PASSWORD_RESET = "AUTH_PASSWORD_RESET",
}

interface AuthRequest extends defaultAction {
  type: AuthTypes.AUTH_REQUEST;
}

interface AuthSuccess extends defaultAction {
  type: AuthTypes.AUTH_SUCCESS;
  payload: UserState;
}

interface AuthError extends defaultAction {
  type: AuthTypes.AUTH_ERROR;
}

interface AuthReset extends defaultAction {
  type: AuthTypes.AUTH_RESET;
}

interface AuthPasswordReset extends defaultAction {
  type: AuthTypes.AUTH_PASSWORD_RESET;
}

export type AuthActions = AuthRequest | AuthSuccess | AuthError | AuthReset | AuthPasswordReset;
