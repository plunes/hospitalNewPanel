import catalogue_saga from "./catalogue_saga"
import dash_saga from "./dash_saga"
import { takeEvery, all } from 'redux-saga/effects';

function *rootSaga() {
    yield all([
        ...catalogue_saga,
        ...dash_saga
    ]);
  }

export default rootSaga