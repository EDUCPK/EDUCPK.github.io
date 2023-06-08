const firebaseConfig = {
    apiKey: "AIzaSyBu9KMVVohTU5xTb8vmrSKG-FhDz0r-EOk",
    authDomain: "educpk-60c69.firebaseapp.com",
    databaseURL: "https://educpk-60c69-default-rtdb.firebaseio.com",
    projectId: "educpk-60c69",
    storageBucket: "educpk-60c69.appspot.com",
    messagingSenderId: "927492878039",
    appId: "1:927492878039:web:e5335c1d225a93cfd08a92"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();