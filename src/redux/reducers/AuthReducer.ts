import { AuthActions, AuthState, AuthTypes } from "../types/AuthorizationType";
import { AnyState } from "../types/defaultType";

const initialState: AnyState<AuthState> = {
  state: null,
  error: null,
};

export const authReducer = (state: AnyState<AuthState> = initialState, action: AuthActions) => {
  switch (action.type) {
    case AuthTypes.AUTH_SUCCESS: {
      return { ...state, state: action.payload, error: null };
    }
    case AuthTypes.AUTH_ERROR: {
      return { ...state, state: null, error: action.payload };
    }
    case AuthTypes.AUTH_RESET: {
      return { ...state, state: null, error: null };
    }
    case AuthTypes.AUTH_PASSWORD_RESET: {
      return { ...state, state: action.payload, error: null };
    }

    // @ https://programmerah.com/solved-error-the-slice-reducer-for-key-auth-returned-undefined-during-initialization-if-the-state-pas-32415/

    default: {
      return state;
    }
  }
};
