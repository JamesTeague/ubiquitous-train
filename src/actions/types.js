import { createAction } from 'redux-actions';

const transformFirebaseAuthUser = (authUser) => {
  if(!authUser) return null;
  return {
    displayName  : authUser.displayName,
    email        : authUser.email,
    emailVerified: authUser.emailVerified,
    uid          : authUser.uid,
  }
};

const transformFirebaseDataToArray = (data) => {
  if(!data) return null;
  let arr = [];
  Object.entries(data).forEach(([key, value]) => {
    arr.push({...value, id: key});
  });
  return arr;
};

export const AUTH_USER_SET = createAction('AUTH_USER_SET',
  transformFirebaseAuthUser);
export const USERS_SET     = createAction('USERS_SET', transformFirebaseDataToArray);
export const CITIES_SET     = createAction('CITIES_SET', transformFirebaseDataToArray);
export const fetchBids     = createAction('FETCH_BIDS');
export const fetchCities   = createAction('FETCH_CITIES');
export const login         = createAction('LOGIN');
export const logout        = createAction('LOGOUT');

