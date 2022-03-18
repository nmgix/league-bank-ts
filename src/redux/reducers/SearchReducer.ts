import { AnyState } from "../types/defaultType";
import { SearchActions, SearchState, UserSearchTypes } from "../types/SearchType";

const initialState: AnyState<SearchState> = {
  searchUser: null,
  searchPosts: null,
};

export const searchReducer = (state: AnyState<SearchState> = initialState, action: SearchActions) => {
  switch (action.type) {
    case UserSearchTypes.USER_FOUND: {
      return { ...state, searchUser: action.payload };
    }
    case UserSearchTypes.USER_NOT_FOUND: {
      return { ...state, searchUser: null };
    }

    default: {
      return state;
    }
  }
};
