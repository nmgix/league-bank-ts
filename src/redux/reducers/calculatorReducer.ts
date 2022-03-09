import { CalculatorActions, CalculatorState, CalculatorTypes } from "../types/calcluatorType";

const initialState: CalculatorState = {
  // activeDropdown: false,
  state: null,
  // error: null,
  // firstStep: null,
};

export const calculatorReducer = (
  state: CalculatorState = initialState,
  action: CalculatorActions
): CalculatorState => {
  switch (action.type) {
    // case CalculatorTypes.SET_DROPDOWN: {
    //   return { ...state, activeDropdown: action.payload };
    // }
    // case CalculatorTypes.SET_FIRST_STEP: {
    //   return { ...state, firstStep: action.payload };
    // }
    case CalculatorTypes.SET_STATE: {
      if (action.payload && action.payload.value !== null) {
        return { ...state, state: { ...state.state, [action.payload.field]: action.payload.value } };
      } else {
        return { ...state, state: {} };
      }
    }
    // case CalculatorTypes.SET_ERROR: {
    //   if (action.payload === null) {
    //     return { ...state, error: null };
    //   } else {
    //     return { ...state, error: action.payload };
    //   }
    // }

    default:
      return state;
  }
};
