import { combineReducers } from 'redux';
import bookmarks from './bookmarks/reducers';
import users from './users/reducers';
export default combineReducers({
  bookmarks,
  users,
});