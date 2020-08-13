import catalogue_saga from "./catalogue_saga"
import dash_saga from "./dash_saga"
import profile_saga from "./profile_saga"
import { takeEvery, all } from 'redux-saga/effects';

function *rootSaga() {
    yield all([
        ...catalogue_saga,
        ...dash_saga,
        ...profile_saga
    ]);
  }

export default rootSaga