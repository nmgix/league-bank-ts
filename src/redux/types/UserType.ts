import { IAccounts } from "./AccountsType";
import { Action, ErrorPayload } from "./defaultType";

export interface INotifications {
  [id: string]: {
    title: string;
    description: string;
    attachments?: any[];
    date: number;
  };
}

export interface IPatterns {
  [id: string]: {
    title: string;
    action: any;
    defaultProps: any /* ActionProps<any> в будущем */;
  };
}

export interface UserInfo {
  notifications?: INotifications;
  accounts: {
    [id: string]: IAccounts;
  };
  patterns: IPatterns;
}

export interface UserState {
  state: UserInfo | null;
  error: void | ErrorPayload;
}

export enum UserInfoTypes {
  USER_INFO_SUCCESS = "USER_INFO_SUCCESS",
  USER_INFO_ERROR = "USER_INFO_ERROR",
  USER_INFO_RESET = "USER_INFO_ERROR",
}

type UserInfoSuccess = Action<typeof UserInfoTypes.USER_INFO_SUCCESS, UserInfo>;
type UserInfoError = Action<typeof UserInfoTypes.USER_INFO_ERROR, ErrorPayload>;
type UserInfoReset = Action<typeof UserInfoTypes.USER_INFO_RESET, void>;

// const UserInfoSuccessAction = (payload: UserInfo): UserInfoSuccess => {
//   return createAction(UserInfoTypes.USER_INFO_SUCCESS, payload)
// }
// const UserInfoErrorAction = (payload: ErrorPayload): UserInfoError => {
//   return createAction(UserInfoTypes.USER_INFO_ERROR, payload)
// }

// const UserInfoResetAction = (): UserInfoReset => {
//   return createAction(UserInfoTypes.USER_INFO_ERROR, null)
// }

export type UserInfoActions = UserInfoSuccess | UserInfoError | UserInfoReset;
