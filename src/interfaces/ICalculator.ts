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

export type CalculatorsLending = MortgageLending | CarLending | ConsumerLending;

type KeysOfUnion<T> = T extends T ? keyof T : never;

export type AvailableKeys = KeysOfUnion<CalculatorsLending>;

export interface ContextState {
  state: any | null;
  setState: React.Dispatch<any>;
}

// type ValueOf<T> = T[keyof T];

export type changeStateFunc = (field: string, value: number | string | boolean) => void;
// надо будет потом заменить number | string | boolean на что-то типа typeof CalculatorsLending[AvailableKeys]
