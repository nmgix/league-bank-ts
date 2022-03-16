import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import ActionCreators from "./actions";
import { composeWithDevTools } from "redux-devtools-extension";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = composeWithDevTools({
  trace: true,
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
