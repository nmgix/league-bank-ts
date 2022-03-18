import { defaultAction } from "./defaultType";

export interface INotifications {
  [id: string]: {
    title: string;
    description: string;
    attachments?: any[];
  };
}

export interface IAccounts {
  [id: string]: {
    name: string;
    type: "settlement" | "credit" | "deposit" | "budget";
    currency: "RUB" | "USD" | "EUR" | "CNY";
    balance: number;
    blocked: boolean;
  };
}

export interface IHistory {
  [id: string]: {
    title: string;
    description: string;
    sender: string; //айди отправителя
    reciever: string;
    currency: "RUB" | "USD" | "EUR" | "CNY";
    value: number;
    //   date: Date;
    date: number;
  };
}

export interface UserInfo {
  notifications?: INotifications;
  accounts: IAccounts;
  history: IHistory;
}

export interface UserState {
  state: UserInfo | null;
  error: string;
}

export enum UserInfoTypes {
  USER_INFO_SUCCESS = "USER_INFO_SUCCESS",
  USER_INFO_ERROR = "USER_INFO_ERROR",
  USER_INFO_RESET = "USER_INFO_ERROR",
}

interface UserInfoSuccess extends defaultAction {
  type: UserInfoTypes.USER_INFO_SUCCESS;
  payload: UserInfo;
}

interface UserInfoError extends defaultAction {
  type: UserInfoTypes.USER_INFO_ERROR;
  payload: string;
}

interface UserInfoReset extends defaultAction {
  type: UserInfoTypes.USER_INFO_RESET;
}

export type UserInfoActions = UserInfoSuccess | UserInfoError | UserInfoReset;
