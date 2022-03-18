import { combineReducers } from "redux";
import { authReducer } from "./AuthReducer";
import { searchReducer } from "./SearchReducer";
import { userInfoReducer } from "./UserInfoReducer";

export const rootReducer = combineReducers({ auth: authReducer, search: searchReducer, userInfo: userInfoReducer });

export type RootState = ReturnType<typeof rootReducer>;
