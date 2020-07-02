import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import thunk from "redux-thunk"
import rootReducer from './reducers';
import all_sagas from "./Sagas/index.js"
console.log(...all_sagas,"all_sagas")
const initialState = {};
const sagaMiddleware = createSagaMiddleware()
const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware,sagaMiddleware),
  )
);

// then run the saga
sagaMiddleware.run(all_sagas.catalogue_saga)


export default store;
