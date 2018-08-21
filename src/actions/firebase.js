import { authRef } from '../config/firebase';

export const firebaseLogout = async () => authRef.signOut();

export const firebaseLogin = async (email, password) =>
  authRef.signInWithEmailAndPassword(email, password);
