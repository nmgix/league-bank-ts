import { AvailableKeys, CalculatorsLending } from "../../interfaces/ICalculator";

export interface CalculatorState {
  activeDropdown: boolean;
  firstStep: keyof typeof FirstStep | null;
  state: /*CalculatorsLending*/ any | null;
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
}

interface SetDropdown {
  type: CalculatorTypes.SET_DROPDOWN;
  payload: boolean;
}

interface SetFirstStep {
  type: CalculatorTypes.SET_FIRST_STEP;
  payload: keyof typeof FirstStep;
}

interface SetState {
  type: CalculatorTypes.SET_STATE;
  payload: { field: AvailableKeys; value: CalculatorsLending } | null;
}

export type CalculatorActions = SetDropdown | SetFirstStep | SetState;
