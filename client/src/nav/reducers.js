import {SEARCH_BOOKMARKS} from './actions';
const initialState = {
  results: []
};

export default (state=initialState, action) => {
    if(action.type === SEARCH_BOOKMARKS) {
        return {
            ...state,
            results: action.results,
        }
    }
    return state;
}
