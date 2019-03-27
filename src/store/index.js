import { applyMiddleware, createStore } from "redux";
import { getFirebase } from "react-redux-firebase";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "./reducers";

export default () =>
  createStore(
    reducers,
    {},
    applyMiddleware(
      thunk.withExtraArgument(getFirebase),
      process.env.NODE_ENV === "development"
        ? logger
        : middlewareAPI => next => action => next(action)
    )
  );
