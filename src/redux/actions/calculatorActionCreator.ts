import { Dispatch } from "redux";
import { AvailableKeys, CalculatorsLending } from "../../interfaces/ICalculator";
import { CalculatorActions, CalculatorTypes, FirstStep } from "../types/calcluatorType";

export function SetDropdown(active: boolean): CalculatorActions {
  // return async (dispatch: Dispatch<CalculatorActions>)
  return { type: CalculatorTypes.SET_DROPDOWN, payload: active };
}

export const SetFirstStep = (firstStep: keyof typeof FirstStep) => {
  return async (dispatch: Dispatch<CalculatorActions>) => {
    dispatch({ type: CalculatorTypes.SET_FIRST_STEP, payload: firstStep });
    dispatch({ type: CalculatorTypes.SET_STATE, payload: null });
  };
};

export function SetState(field: AvailableKeys, value: any): CalculatorActions {
  return { type: CalculatorTypes.SET_STATE, payload: { field, value } };
}
