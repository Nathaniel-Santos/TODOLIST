import firebase from 'firebase/app';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyD8yTfkGFYOyWC-625eZMJ9RUVpnxh5Tns",
    authDomain: "todolist-dea65.firebaseapp.com",
    databaseURL: "https://todolist-dea65.firebaseio.com",
    projectId: "todolist-dea65",
    storageBucket: "todolist-dea65.appspot.com",
    messagingSenderId: "431086413986",
    appId: "1:431086413986:web:671248b4c27109a7aecffb",
    measurementId: "G-YS428WJ3HD"
  };
  
  //If doesn't exist an open connection, then start this one
  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
  }
  
  export default firebase;