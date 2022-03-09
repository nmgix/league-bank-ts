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

// // @ https://dev.to/finallynero/redux-action-stack-trace-1m0d
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&

//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//     trace: true,
//     traceLimit: 25
// }) || compose;

// // @ https://redux.js.org/usage/configuring-your-store/
// const middlewares = [thunkMiddleware]
// const middlewareEnhancer = applyMiddleware(...middlewares)

// const enhancers = [middlewareEnhancer]

// // const composeEnhancers = composeWithDevTools({
// //   ActionCreators,
// //   trace: true,
// //   traceLimit: 25,
// // })

const composeEnhancers = composeWithDevTools({
  trace: true,
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
