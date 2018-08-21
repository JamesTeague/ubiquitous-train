import { combineReducers } from 'redux';

import firebaseReducer from './firebase';
import sessionReducer from './session';
import userReducer from './user';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  session: sessionReducer,
  user: userReducer,
});

export default rootReducer
