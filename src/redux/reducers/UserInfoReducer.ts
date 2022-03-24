import { UserInfoActions, UserState, UserInfoTypes } from "../types/UserType";
import { AnyState } from "../types/defaultType";

const initialState: AnyState<UserState> = {
  state: null,
  error: null,
};
export const userInfoReducer = (
  state: AnyState<UserState> = initialState,
  action: UserInfoActions
): AnyState<UserState> => {
  switch (action.type) {
    case UserInfoTypes.USER_INFO_SUCCESS: {
      return { ...state, state: action.payload, error: null };
    }
    case UserInfoTypes.USER_INFO_ERROR: {
      return { ...state, state: null, error: action.payload };
    }
    case UserInfoTypes.USER_INFO_RESET: {
      return { ...state, state: null, error: null };
    }
    default: {
      return state;
    }
  }
};
