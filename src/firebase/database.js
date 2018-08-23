import { citiesRef, usersRef } from '../config/firebase';

export const doCreateUser = (uid, username, email, emailVerified, displayName) =>
  usersRef.child(uid).set({
    username,
    email,
    emailVerified,
    displayName
  });

export const onceGetUsers = () => usersRef.once('value');
export const onceGetCities = () => citiesRef.once('value');
export const onCityValue = (callback) => citiesRef.on('value', callback);
