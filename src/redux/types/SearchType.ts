import { Action } from "./defaultType";

export interface INews {
  title: string;
  description: string;
  link: string;
  attachment?: any;
}

interface searchUser {
  searchUser: string | null;
}

export interface SearchState {
  searchUser: searchUser;
  searchPosts: any[] | null;
  recommentation: {
    news: INews[];
  };
}

export enum UserSearchTypes {
  USER_FOUND = "USER_FOUND",
  USER_NOT_FOUND = "USER_NOT_FOUND",
}

export enum RecommendationsTypes {
  RECOMMENDATION_NEWS_FOUND = "RECOMMENDATION_NEWS_FOUND",
  // RECOMMENDATION_NEWS_NOT_FOUND = "RECOMMENDATION_NEWS_NOT_FOUND",
}

export enum SearchTypes {}

type UserFound = Action<UserSearchTypes.USER_FOUND, searchUser>;
type UserNotFound = Action<UserSearchTypes.USER_NOT_FOUND, void>;

type UserSearchActions = UserFound | UserNotFound;

export type RecommendationNewsFound = Action<typeof RecommendationsTypes.RECOMMENDATION_NEWS_FOUND, INews[]>;

// interface RecommendationNewsNotFound extends defaultAction {
//   type: RecommendationsTypes.RECOMMENDATION_NEWS_NOT_FOUND;
// }

type RecommendationSearchActions = RecommendationNewsFound;

export type SearchActions = UserSearchActions | RecommendationSearchActions;
