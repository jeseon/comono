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

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [{
    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    scopes: ['https://www.googleapis.com/auth/plus.login']
  }],
  tosUrl: '/',
  callbacks: {
    signInSuccess: function(user, credential, redirectUrl) {
      handleSignedInUser(user);
      return false;
    }
  },
};

const handleSignedInUser = user => {
  document.getElementById('name').textContent = user.displayName;
  document.getElementById('email').textContent = user.email;
  document.getElementById('phone').textContent = user.phoneNumber;

  if (user.photoURL) {
    document.getElementById('photo').src = user.photoURL;
    document.getElementById('photo').style.display = 'block';
  } else {
    document.getElementById('photo').style.display = 'none';
  }
};

export const storageKey = 'comonos';
export const firebaseApp = firebase.initializeApp(config);
export const auth = firebaseApp.auth();
export const database = firebaseApp.database();

const ui = new firebaseui.auth.AuthUI(auth);

export const firebaseAuth = elemt => {
  ui.start(elemt, uiConfig);
}

export const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem(storageKey);
}