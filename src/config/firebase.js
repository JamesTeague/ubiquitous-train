import * as firebase from 'firebase';

import { FirebaseConfig } from '../config/keys';
import firebasePaths from "../constants/referencePaths";
import { compose, createStore } from "redux";
import { reactReduxFirebase } from "react-redux-firebase";
import rootReducer from "../reducers";

firebase.initializeApp(FirebaseConfig);

const config = {
  bids: firebasePaths.BIDS,
  cities: firebasePaths.CITIES,
  users: firebasePaths.USERS,
  votes: firebasePaths.VOTES,
  enableLogging: false,
};
const createStoreWithFirebase = compose(reactReduxFirebase(firebase, config))(createStore);

export const store = createStoreWithFirebase(rootReducer, {});

const databaseRef      = firebase.database().ref();
export const authRef   = firebase.auth();
export const bidsRef   = databaseRef.child(firebasePaths.BIDS);
export const citiesRef = databaseRef.child(firebasePaths.CITIES);
export const usersRef  = databaseRef.child(firebasePaths.USERS);
export const votesRef  = databaseRef.child(firebasePaths.VOTES);

const adminApp = firebase.initializeApp(FirebaseConfig, 'admin');
export const adminAuthRef = adminApp.auth();
