import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

firebase.initializeApp({
  apiKey: 'AIzaSyABcfSnH5h2j9dLNdI7Yu8LRE1YJCeywc0',
  authDomain: 'monos-8d56f.firebaseapp.com',
  databaseURL: 'https://monos-8d56f.firebaseio.com',
  projectId: 'monos-8d56f',
  storageBucket: 'monos-8d56f.appspot.com',
  messagingSenderId: '552638308978'
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
