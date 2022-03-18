import * as AuthActions from "./AuthActionCreator";
import * as SearchActions from "./SearchActionCreators";
import * as UserInfoActions from "./UserInfoActionCreators";

export default {
  ...AuthActions,
  ...SearchActions,
  ...UserInfoActions,
};
