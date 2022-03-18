import { defaultAction } from "./defaultType";

export interface SearchState {
  searchUser: string | null;
  searchPosts: any[] | null;
}

export enum UserSearchTypes {
  USER_FOUND = "USER_FOUND",
  USER_NOT_FOUND = "USER_NOT_FOUND",
}

export enum SearchTypes {}

interface UserFound extends defaultAction {
  type: UserSearchTypes.USER_FOUND;
}

interface UserNotFound extends defaultAction {
  type: UserSearchTypes.USER_NOT_FOUND;
}

export type SearchActions = UserFound | UserNotFound;
