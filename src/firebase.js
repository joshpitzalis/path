import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyCV9WmfUtrfoV0AtJAoc1ZyVVZIoO0YsEU',
  authDomain: 'path-1ba3e.firebaseapp.com',
  databaseURL: 'https://path-1ba3e.firebaseio.com',
  projectId: 'path-1ba3e',
  storageBucket: 'path-1ba3e.appspot.com',
  messagingSenderId: '231331996683'
}

firebase.initializeApp(config)

export default firebase

export const database = firebase.database()
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()