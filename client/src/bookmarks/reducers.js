import {FETCH_BOOKMARKS_REQUEST, FETCH_BOOKMARKS_SUCCESS, FETCH_BOOKMARKS_ERROR} from './actions';
const initialState = {
    bookmarks: [],
    loading: false,
    error: null
};

export default (state=initialState, action) => {
    if(action.type === FETCH_BOOKMARKS_REQUEST) {
        return {
            ...state,
            loading: true,
            error: null
        }
    }
    if(action.type === FETCH_BOOKMARKS_SUCCESS) {
        return {
            ...state,
            loading: false,
            error: null,
            bookmarks: action.bookmarks
        }
    }

    if(action.type === FETCH_BOOKMARKS_ERROR) {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }
    return state;
}

