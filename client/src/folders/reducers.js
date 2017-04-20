import {FETCH_FOLDERS_REQUEST, FETCH_FOLDERS_SUCCESS, FETCH_FOLDERS_ERROR, TOGGLE_ADD_FOLDER, EDIT_FOLDER, CURRENT_FOLDER} from './actions';
const initialState = {
    folders: [],
    loading: false,
    error: null,
    toggleAdd: false,
    editing: false,
    currentFolderId: null
};

export default (state=initialState, action) => {
    if(action.type === CURRENT_FOLDER) {
        return {
            ...state,
            currentFolderId: action.currentFolderId
        }
    }
    if(action.type === TOGGLE_ADD_FOLDER) {
        return {
            ...state,
            toggleAdd: !state.toggleAdd
        }
    }
    if(action.type === EDIT_FOLDER) {
        return {
            ...state,
            editing: action.editing
        }
    }
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

