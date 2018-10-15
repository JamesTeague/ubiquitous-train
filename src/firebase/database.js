import { usersRef } from '../config/firebase';

export const doCreateUser = (uid, username, email, emailVerified, displayName, permission) =>
  usersRef.child(uid).set({
    username,
    email,
    emailVerified,
    displayName,
    permission,
  });

export const doesUserExist = async (uid) => {
  const firebaseUser = await onceGetUser(uid);
  return firebaseUser.exists()?  firebaseUser.val() : false;
};

export const onceGetUser = (uid) => usersRef.child(uid).once('value');
