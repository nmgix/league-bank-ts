import { AvailableKeys, CalculatorsLending } from "../../interfaces/ICalculator";
import { CalculatorActions, CalculatorTypes, FirstStep } from "../types/calcluatorType";

// export function SetDropdown(active: boolean): CalculatorActions {
//   // return async (dispatch: Dispatch<CalculatorActions>)
//   return { type: CalculatorTypes.SET_DROPDOWN, payload: active };
// }

// export const SetFirstStep = (firstStep: keyof typeof FirstStep) => {
//   return async (dispatch: Dispatch<CalculatorActions>) => {
//     dispatch({ type: CalculatorTypes.SET_FIRST_STEP, payload: firstStep });
//     dispatch({ type: CalculatorTypes.SET_STATE, payload: null });
//   };
// };

export function SetState(field: AvailableKeys, value: any): CalculatorActions {
  if (value === null) {
    return { type: CalculatorTypes.SET_STATE, payload: null };
  } else {
    return { type: CalculatorTypes.SET_STATE, payload: { field, value } };
  }
}

// export function SetError(error: string | null): CalculatorActions {
//   if (error === null) {
//     return { type: CalculatorTypes.SET_ERROR, payload: null };
//   } else {
//     return { type: CalculatorTypes.SET_ERROR, payload: error };
//   }
// }
