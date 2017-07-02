import firebase from 'firebase';
import firebaseui from 'firebaseui';

const config = {
  apiKey: 'AIzaSyABcfSnH5h2j9dLNdI7Yu8LRE1YJCeywc0',
  authDomain: 'monos-8d56f.firebaseapp.com',
  databaseURL: 'https://monos-8d56f.firebaseio.com',
  projectId: 'monos-8d56f',
  storageBucket: 'monos-8d56f.appspot.com',
  messagingSenderId: '552638308978'
};

firebase.initializeApp(config);

export const storageKey = 'comonos';
export const ref = firebase.database().ref();
export const database = firebase.database();
export const firebaseAuth = firebase.auth;

const ui = new firebaseui.auth.AuthUI(firebaseAuth());
export const firebaseUiStart = elemt => {
  ui.start(elemt, {
    signInFlow: 'popup',
    signInOptions: [{
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: ['https://www.googleapis.com/auth/plus.login']
    }],
    tosUrl: '/',
    callbacks: {
      signInSuccess: function(user, credential, redirectUrl) {
        return false;
      }
    }
  });
};

export const isAuthenticated = () => {
  return !!firebaseAuth().currentUser || !!localStorage.getItem(storageKey);
};