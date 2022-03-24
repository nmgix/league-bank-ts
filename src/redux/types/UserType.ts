import { Action, ErrorPayload } from "./defaultType";

export enum incomeTypes {
  "iternal-account-transaction_from" = "Внутренние транзакции между счетами",
  "transaction_from" = "Транзакции извне",
  "deposit" = "Пополнения валютой",
}

export enum expensesTypes {
  "iternal-account-transaction_to" = "Внутренние транзакции между счетами",
  "other-payments" = "Другие платежи",
  "utilities_payment" = "Оплата коммунальных услуг",
  "transaction_to" = "Транзакции на другие счета",
  "withdrawal" = "Снятия валюты",
}

export type exchangeType = keyof typeof incomeTypes | keyof typeof expensesTypes;

export interface INotifications {
  [id: string]: {
    title: string;
    description: string;
    attachments?: any[];
    date: number;
  };
}

export interface IAccounts {
  name: string;
  type: "settlement" | "credit" | "deposit" | "budget";
  currency: "RUB" | "USD" | "EUR" | "CNY";
  balance: number;
  blocked: boolean;
  history: IHistory;
}

export interface IHistory {
  [id: string]:
    | {
        title: string;
        description: string;
        type: exchangeType;
        sender: string; //айди отправителя
        reciever: string;
        currency: "RUB" | "USD" | "EUR" | "CNY";
        value: number;
        //   date: Date;
        date: number;
      }
    | {
        title: string;
        description: string;
        type: exchangeType;
        currency: "RUB" | "USD" | "EUR" | "CNY";
        value: number;
        //   date: Date;
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
