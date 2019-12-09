import firebase from 'firebase/app';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC9Gt_6X0URbaY1PA7khQZoqJqnohBKpL4",
    authDomain: "consultbrian-vuetify.firebaseapp.com",
    databaseURL: "https://consultbrian-vuetify.firebaseio.com",
    projectId: "consultbrian-vuetify",
    storageBucket: "consultbrian-vuetify.appspot.com",
    messagingSenderId: "842162482063",
    appId: "1:842162482063:web:a80a38cbf24cfaabecb9fa",
    measurementId: "G-CF9RW8RCMR"
  };
  firebase.initializeApp(firebaseConfig);