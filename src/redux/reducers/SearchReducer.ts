import { AnyState } from "../types/defaultType";
import { RecommendationsTypes, SearchActions, SearchState, UserSearchTypes } from "../types/SearchType";

const initialState: AnyState<SearchState> = {
  searchUser: null,
  searchPosts: null,
  recommentation: {
    news: [],
  },
};

export const searchReducer = (
  state: AnyState<SearchState> = initialState,
  action: SearchActions
): AnyState<SearchState> => {
  switch (action.type) {
    case UserSearchTypes.USER_FOUND: {
      return { ...state, searchUser: action.payload };
    }
    case UserSearchTypes.USER_NOT_FOUND: {
      return { ...state, searchUser: null };
    }

    case RecommendationsTypes.RECOMMENDATION_NEWS_FOUND: {
      return {
        ...state,
        recommentation: {
          ...state["recommentation"],
          news: state["recommentation"] ? [...state["recommentation"].news, ...action.payload] : [...action.payload],
        },
      };
    }

    default: {
      return state;
    }
  }
};
