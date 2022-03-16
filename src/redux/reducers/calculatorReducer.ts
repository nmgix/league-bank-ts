import { CalculatorActions, CalculatorState, CalculatorTypes } from "../types/calcluatorType";

const initialState: CalculatorState = {
  state: null,
};

export const calculatorReducer = (
  state: CalculatorState = initialState,
  action: CalculatorActions
): CalculatorState => {
  switch (action.type) {
    case CalculatorTypes.SET_STATE: {
      if (action.payload && action.payload.value !== null) {
        return { ...state, state: { ...state.state, [action.payload.field]: action.payload.value } };
      } else {
        return { ...state, state: {} };
      }
    }

    default:
      return state;
  }
};
