import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBqsM-agXrT98C7_KhFfQ8_nVqXYVpAzLE",
    authDomain: "automacao-a9861.firebaseapp.com",
    databaseURL: "https://automacao-a9861.firebaseio.com",
    projectId: "automacao-a9861",
    storageBucket: "automacao-a9861.appspot.com",
    messagingSenderId: "644189323232",
    appId: "1:644189323232:web:6a40586a61a1528c"
};

firebase.initializeApp(config);

export default firebase;
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();