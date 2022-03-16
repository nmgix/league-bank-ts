import { AvailableKeys } from "../../interfaces/ICalculator";
import { CalculatorActions, CalculatorTypes } from "../types/calcluatorType";

export function SetState(field: AvailableKeys, value: any): CalculatorActions {
  if (value === null) {
    return { type: CalculatorTypes.SET_STATE, payload: null };
  } else {
    return { type: CalculatorTypes.SET_STATE, payload: { field, value } };
  }
}
