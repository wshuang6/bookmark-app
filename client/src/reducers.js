import { combineReducers } from 'redux';
import bookmarks from './bookmarks/reducers';
import folders from './folders/reducers';
import login from './login/reducers';
import nav from './nav/reducers';

export default combineReducers({
  bookmarks,
  folders,
  login,
  nav
});