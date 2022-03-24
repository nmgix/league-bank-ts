import { Action, ErrorPayload } from "./defaultType";

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
  error: void | null | {} | ErrorPayload;
}

export enum AuthTypes {
  AUTH_REQUEST = "AUTH_REQUEST",
  AUTH_SUCCESS = "AUTH_SUCCESS",
  AUTH_ERROR = "AUTH_ERROR",
  AUTH_RESET = "AUTH_ERROR",
  AUTH_PASSWORD_RESET = "AUTH_PASSWORD_RESET",
}

type AuthRequest = Action<typeof AuthTypes.AUTH_REQUEST, void>;
type AuthSuccess = Action<typeof AuthTypes.AUTH_SUCCESS, UserState>;
type AuthError = Action<typeof AuthTypes.AUTH_ERROR, ErrorPayload>;
type AuthReset = Action<typeof AuthTypes.AUTH_RESET, {}>;
type AuthPasswordReset = Action<typeof AuthTypes.AUTH_PASSWORD_RESET, any>;

export type AuthActions = AuthRequest | AuthSuccess | AuthError | AuthReset | AuthPasswordReset;
