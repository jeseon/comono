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

export const storageKey = 'comonos';
export const firebaseApp = firebase.initializeApp(config);
export const database = firebaseApp.database();

const ui = new firebaseui.auth.AuthUI(firebaseApp.auth());
export const firebaseAuth = (elemt, onSignedIn) => {
  ui.start(elemt, {
    signInFlow: 'popup',
    signInOptions: [{
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: ['https://www.googleapis.com/auth/plus.login']
    }],
    tosUrl: '/',
    callbacks: {
      signInSuccess: function(user, credential, redirectUrl) {
        onSignedIn(user);
        return false;
      }
    }
  });
};

export const isAuthenticated = () => {
  return !!firebaseApp.auth().currentUser || !!localStorage.getItem(storageKey);
};