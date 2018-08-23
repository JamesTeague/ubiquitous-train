import { CITIES_SET, CITIES_UNSET } from '../actions/types';
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
  [CITIES_UNSET]: (state) => ({
    ...state,
    cities: null,
  }),
}, firebaseDefault);

export default firebaseReducer

