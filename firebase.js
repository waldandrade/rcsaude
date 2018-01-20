import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA2BI3dac6zOR6aMmeJcVncAGMgrSbbaDo",
  authDomain: "rccard-5d4ee.firebaseapp.com",
  databaseURL: "https://rccard-5d4ee.firebaseio.com",
  projectId: "rccard-5d4ee",
  storageBucket: "rccard-5d4ee.appspot.com",
  messagingSenderId: "36838720809"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
