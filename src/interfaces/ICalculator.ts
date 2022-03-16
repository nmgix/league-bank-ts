import React, { Dispatch } from "react";
import { FirstStep } from "../redux/types/calcluatorType";

export interface ICalculator {
  activeDropdown: boolean;
  firstStep: keyof typeof FirstStep | null;
}

export type IFields = {
  value: number;
  error: React.ReactNode | null;
};

export type IFieldsArray = {
  [x: string]: IFields;
};

export interface MortgageLending {
  estate_cost: number;
  initial_payment: number;
  loan_term: number;
  parent_capital: boolean;
}

export interface CarLending {
  car_cost: number;
  initial_payment: number;
  loan_term: number;
  casko: boolean;
  insurance: boolean;
}

export interface ConsumerLending {
  consumer_loan_cost: number;
  loan_term: number;
  member: boolean;
}

export type CalculatorsLending = MortgageLending & CarLending & ConsumerLending;

export type KeysOfUnion<T> = T extends T ? keyof T : never;

export type AvailableKeys = KeysOfUnion<CalculatorsLending>;

export interface ContextState {
  state: any | null;
  setState: React.Dispatch<any>;
}

// type ValueOf<T> = T[keyof T];

export type changeStateFunc = (field: string, value: number | string | boolean) => void;
// надо будет потом заменить number | string | boolean на что-то типа typeof CalculatorsLending[AvailableKeys]

export interface OurOffer {
  loan_amount: number | null;
  interest_rate: number | null;
  monthly_payment: number | null;
  required_income: number | null;
}

export interface TextInputBaseInterface {
  // label: string;
  // type: any;
  // onFocus: boolean;
  // touched: boolean;
  // dirty: boolean;
  // valid: boolean;
  // invalid: boolean;
  // invalidMsg: null;
  // value: number | string | boolean;
  // min?: boolean | number;
  // max?: boolean | number;
  // inputName: string;
  // required: boolean,

  inputName: string;
  type: "text" | "number" | "range" | "checkbox";
  initialValue: any;
  value?: number | string | boolean;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  label?: string;
  prefix?: string;
  showStep?: boolean;
  dependencyMin?: AvailableKeys;
  dependencyMax?: AvailableKeys;
  minBoundError?: React.ReactNode;
  maxBoundError?: React.ReactNode;
}
