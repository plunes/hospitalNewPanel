import { combineReducers } from 'redux';
// import postReducer from './postReducer';
import userReducer from './userReducer';
import catalogue_reducer from './catalogue_reducer';

export default combineReducers({
  // posts: postReducer,
  user : userReducer,
  catalogue_store:catalogue_reducer
});
