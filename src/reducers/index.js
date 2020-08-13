import { combineReducers } from 'redux';
// import postReducer from './postReducer';
import userReducer from './userReducer';
import catalogue_reducer from './catalogue_reducer';
import dash_reducer from './dash_reducer';
import profile_reducer from './profile_reducer';
console.log(dash_reducer,"dash_reducer")
export default combineReducers({
  // posts: postReducer,
  user : userReducer,
  catalogue_store:catalogue_reducer,
  dash_store:dash_reducer,
  profile_store:profile_reducer
});
