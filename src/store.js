import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import thunk from "redux-thunk"
import rootReducer from './reducers';
import rootSaga from "./Sagas/index.js"
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
sagaMiddleware.run(rootSaga)


export default store;
