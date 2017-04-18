import { combineReducers } from 'redux';
import bookmarks from './bookmarks/reducers';
import folders from './folders/reducers';

export default combineReducers({
  bookmarks,
  folders
});