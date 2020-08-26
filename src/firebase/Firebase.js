import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCR5IyeN4-C3OLtwf-GxkabJp_0eeh9Ris",
    authDomain: "expinf.firebaseapp.com",
    databaseURL: "https://expinf.firebaseio.com",
    projectId: "expinf",
    storageBucket: "expinf.appspot.com",
    messagingSenderId: "538184241590",
    appId: "1:538184241590:web:e2971c7c9c90c8276c3117",
    measurementId: "G-0KH5XHEJMD"

};

firebase.initializeApp(config);
export default firebase