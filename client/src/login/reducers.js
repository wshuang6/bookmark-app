import {SET_USER, TOGGLE_LOGGING_IN} from './actions';
const initialState = {
  loggingIn: false,
  authenticated: false,
  email: null,
  userid: null
};

export default (state=initialState, action) => {
    if(action.type === SET_USER) {
        return {
            ...state,
            authenticated: true,
            email: action.email,
            userid: action.userid,
        }
    }
    if(action.type===TOGGLE_LOGGING_IN) {
        return {
            ...state,
            loggingIn: action.loggingIn
        }
    }
    return state;
}
