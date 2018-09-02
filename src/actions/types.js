import { createAction } from 'redux-actions';

const transformFirebaseDataToArray = (data) => {
  if(!data) return null;
  let arr = [];
  Object.entries(data).forEach(([key, value]) => {
    arr.push({...value, id: key});
  });
  return arr;
};

export const AUTH_USER_SET = createAction('AUTH_USER_SET');
export const USERS_SET     = createAction('USERS_SET', transformFirebaseDataToArray);
export const CITIES_SET    = createAction('CITIES_SET', transformFirebaseDataToArray);
export const CITIES_UNSET  = createAction('CITIES_UNSET');

