import { CITIES_SET } from '../actions/types';
import { handleActions } from 'redux-actions';

const firebaseDefault = {
  bids  : null,
  cities: null,
};

const firebaseReducer = handleActions({
  [CITIES_SET]: (state, action) =>({
    ...state,
    cities: action.payload,
  }),
}, firebaseDefault);

export default firebaseReducer

