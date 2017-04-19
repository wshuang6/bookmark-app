import {TOGGLE_LOGGING_IN} from './actions';
const initialState = {
  loggingIn: false
};

export default (state=initialState, action) => {
    if(action.type === TOGGLE_LOGGING_IN) {
        return {
            ...state,
            loggingIn: action.loggingIn
        }
    }
    return state;
}
