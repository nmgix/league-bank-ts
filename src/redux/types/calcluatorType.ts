import React from "react";
import { AvailableKeys, CalculatorsLending } from "../../interfaces/ICalculator";

export interface CalculatorState {
  // activeDropdown: boolean;
  // firstStep: keyof typeof FirstStep | null;
  state: /*CalculatorsLending*/ any | null;
  // error: /*React.ReactNode |*/ string | null;
}

export enum FirstStep {
  mortgageLending,
  carLending,
  consumerLending,
}

export enum translateText {
  "mortgageLending" = "Ипотечное кредитование",
  "carLending" = "Автомобильное кредитование",
  "consumerLending" = "Потребительский кредит",
}

export enum CalculatorTypes {
  SET_DROPDOWN = "SET_DROPDOWN",
  SET_FIRST_STEP = "SET_FIRST_STEP",
  SET_STATE = "SET_STATE",
  SET_ERROR = "SET_ERROR",
}

// interface SetDropdown {
//   type: CalculatorTypes.SET_DROPDOWN;
//   payload: boolean;
// }

// interface SetFirstStep {
//   type: CalculatorTypes.SET_FIRST_STEP;
//   payload: keyof typeof FirstStep;
// }

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
