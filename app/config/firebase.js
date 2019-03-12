import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyAhl6f4JdcPSRkG-_anJ9kVwaPnSA1o5SE",
  authDomain: "beloyal.firebaseapp.com",
  databaseURL: "https://beloyal.firebaseio.com",
  projectId: "beloyal",
  storageBucket: "beloyal.appspot.com",
  messagingSenderId: "1004942834034"
};

firebase.initializeApp(config);

export default firebase;
