import { KeysOfUnion } from "../../interfaces/ICalculator";

export const BalanceType: { [x in KeysOfUnion<BalanceTypeEnum>]: defaultBalanceActions } = {
  deposit: {
    withdraw: "Снять",
    deposit: "Пополнить",
  },
  settlement: {
    withdraw: "Снять",
    deposit: "Пополнить",
    statement: "Выписка",
  },
  budget: {
    withdraw: "Снять",
    deposit: "Пополнить",
  },
  credit: {
    withdraw: "Снять",
    deposit: "Пополнить",
    statement: "Выписка",
    close: "Закрыть кредит",
  },
};

export enum incomeTypes {
  "iternal-account-transaction_from" = "Внутренние транзакции между счетами",
  "transaction_from" = "Транзакции извне",
  "deposit" = "Пополнения валютой",
  "open_credit" = "Открытие кредита",
}

export enum expensesTypes {
  "iternal-account-transaction_to" = "Внутренние транзакции между счетами",
  "other-payments" = "Другие платежи",
  "utilities_payment" = "Оплата коммунальных услуг",
  "transaction_to" = "Транзакции на другие счета",
  "withdrawal" = "Снятия валюты",
}

export interface IAccounts {
  name: string;
  type: KeysOfUnion<BalanceTypeEnum>;
  currency: "RUB" | "USD" | "EUR" | "CNY";
  balance: number;
  blocked: boolean;
  history: IHistory;
}

export interface IHistory {
  [id: string]: HistoryPropsTransaction | defaultHistoryProps;
}

export interface defaultHistoryProps {
  title: string;
  description: string;
  type: exchangeTypeKeys;
  currency: "RUB" | "USD" | "EUR" | "CNY";
  value: number;
  //   date: Date;
  date: number;
}

export interface HistoryPropsTransaction extends defaultHistoryProps {
  title: string;
  description: string;
  type: exchangeTypeKeys;
  sender: string; //айди отправителя
  reciever: string;
  currency: "RUB" | "USD" | "EUR" | "CNY";
  value: number;
  //   date: Date;
  date: number;
}

interface defaultBalanceActions {
  withdraw: string;
  deposit: string;
  [x: string]: string;
}

interface depositType {
  deposit: defaultBalanceActions;
}
// export interface depositProps {
//   withdraw: string;
//   deposit: string;
// }

interface creditType {
  credit: defaultBalanceActions;
}
// export interface creditProps {
//   withdraw: string;
//   deposit: string;
// }

export interface settlementType {
  settlement: defaultBalanceActions;
}
// export interface settlementProps {
//   withdraw: string;
//   deposit: string;
// }

interface budgetType {
  budget: defaultBalanceActions;
}
// export interface budgetProps {
//   withdraw: string;
//   deposit: string;
// }

export type BalanceTypeEnum = depositType | creditType | settlementType | budgetType;

// enum BalanceTypes {
//   "settlement", "credit", "deposit", "budget"
// }

// type BalanceTyped = {
//   [x in BalanceTypes]: any
// }

// enum BalanceTypeAction {
//   withdraw
// }

export const exchangeType = {
  ...incomeTypes,
  ...expensesTypes,
};

export type exchangeTypeKeys = keyof typeof incomeTypes | keyof typeof expensesTypes;
