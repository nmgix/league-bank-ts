import React from "react";
import { AvailableKeys, CalculatorsLending } from "../../interfaces/ICalculator";

export interface CalculatorState {
  state: /*CalculatorsLending*/ any | null;
}

export enum FirstStep {
  mortgageLending = "Ипотечное кредитование",
  carLending = "Автомобильное кредитование",
  consumerLending = "Потребительский кредит",
}

export enum CalculatorTypes {
  SET_DROPDOWN = "SET_DROPDOWN",
  SET_FIRST_STEP = "SET_FIRST_STEP",
  SET_STATE = "SET_STATE",
  SET_ERROR = "SET_ERROR",
}

interface SetState {
  type: CalculatorTypes.SET_STATE;
  payload: { field: AvailableKeys; value: CalculatorsLending } | null;
}

interface SetError {
  type: CalculatorTypes.SET_ERROR;
  payload: string | null;
}

export type CalculatorActions = /*SetDropdown | SetFirstStep |*/ SetState | SetError;

export enum CalculationErrors {
  minThersholdError = "minThersholdError",
  maxThersholdError = "maxThersholdError",
  threshold = "threshold",
  default = "default",
}
