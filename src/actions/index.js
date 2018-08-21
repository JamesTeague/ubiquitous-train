import { bidsRef } from '../config/firebase';

export const addBid = (newBid) => async dispatch => {
  bidsRef.push().set(newBid);
};

