import { handleActions } from 'redux-actions';
import { USERS_SET } from '../actions/types';

const INITIAL_STATE = {
  users: {},
};

const userReducer = handleActions({
  [USERS_SET]: (state, action) => ({
    ...state,
    user: action.payload
  })
}, INITIAL_STATE);

export default userReducer;
