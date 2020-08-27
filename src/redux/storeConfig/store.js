import { createStore, applyMiddleware, compose } from "redux";
import createDebounce from "redux-debounced";
import thunk from "redux-thunk";
import rootReducer from '../reducer/rootReducer';
import { createLogger } from "redux-logger";

const middlewares = [thunk, createDebounce()];
const logger = createLogger({});

if (process.env.NODE_ENV == "development") {
  middlewares.push(logger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middlewares))
);

export { store };
