import * as firebase from 'firebase';

import { FirebaseConfig } from '../config/keys';

firebase.initializeApp(FirebaseConfig);

const databaseRef      = firebase.database().ref();
export const bidsRef   = databaseRef.child('bids');
export const citiesRef = databaseRef.child('cities');
export const usersRef  = databaseRef.child('users');
export const votesRef  = databaseRef.child('votes');
export const authRef   = firebase.auth();
