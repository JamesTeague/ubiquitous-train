import { handleActions } from 'redux-actions';
import { AUTH_USER_SET } from '../actions/types';

const INITIAL_STATE = {
  authUser: null,
};

const sessionReducer = handleActions({
  [AUTH_USER_SET]: (state, action) => ({
    ...state,
    authUser: action.payload,
  })
}, INITIAL_STATE);

export default sessionReducer;
