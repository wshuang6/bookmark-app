import {FETCH_FOLDERS_REQUEST, FETCH_FOLDERS_SUCCESS, FETCH_FOLDERS_ERROR} from './actions';
const initialState = {
    folders: [],
    loading: false,
    error: null
};

export default (state=initialState, action) => {
    if(action.type === FETCH_FOLDERS_REQUEST) {
        return {
            ...state,
            loading: true,
            error: null
        }
    }
    if(action.type === FETCH_FOLDERS_SUCCESS) {
        return {
            ...state,
            loading: false,
            error: null,
            folders: action.folders
        }
    }

    if(action.type === FETCH_FOLDERS_ERROR) {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }
    return state;
}
