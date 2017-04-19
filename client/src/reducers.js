import { combineReducers } from 'redux';
import bookmarks from './bookmarks/reducers';
import folders from './folders/reducers';
import users from './users/reducers';
import login from './login/reducers';

export default combineReducers({
  bookmarks,
  folders,
  users,
  login
});