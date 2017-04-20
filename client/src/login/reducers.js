import {SET_USER, SET_ERROR, TOGGLE_LOGGING_IN} from './actions';
const initialState = {
  loggingIn: false,
  authenticated: false,
  email: null,
  userid: null,
  error: null
};

export default (state=initialState, action) => {
    if(action.type === SET_USER) {
        return {
            ...state,
            authenticated: true,
            email: action.email,
            userid: action.userid,
            error: null
        }
    }
    if(action.type===TOGGLE_LOGGING_IN) {
        return {
            ...state,
            loggingIn: action.loggingIn
        }
    }
    if (action.type===SET_ERROR) {
        return {
            ...state,
            error: action.error
        }
    }
    return state;
}
