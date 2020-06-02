import firebase from "firebase/app";
import "firebase/storage";

// <-- firebase SDK -->
var firebaseConfig = {
  apiKey: "AIzaSyBkV1bSp1Do4Wq7mm_0BbtdwYlJECacidg",
  authDomain: "hokugu-img.firebaseapp.com",
  databaseURL: "https://hokugu-img.firebaseio.com",
  projectId: "hokugu-img",
  storageBucket: "hokugu-img.appspot.com",
  messagingSenderId: "325176174918",
  appId: "1:325176174918:web:e2fae7692ef81aa57fdd47",
  measurementId: "G-9VP01NDSXJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
// analytics is optional for this tutorial
// firebase.analytics();

export { storage, firebase as default };
