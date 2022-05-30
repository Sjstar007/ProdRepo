import {createStore, applyMiddleware} from 'redux';
import logger from "redux-logger";
import rootReducer from "./reducers/index";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [logger,sagaMiddleware];
const store = createStore(rootReducer,applyMiddleware(...middleware));

export default store;