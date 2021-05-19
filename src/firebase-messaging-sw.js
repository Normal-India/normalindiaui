importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');


firebase.initializeApp({
    apiKey: "AIzaSyBzakrnYl5abbtd0xwXk1jYjTbTsY4Ou6A",
    authDomain: "normal-india.firebaseapp.com",
    projectId: "normal-india",
    storageBucket: "normal-india.appspot.com",
    messagingSenderId: "504663250244",
    appId: "1:504663250244:web:1d86415f8b8a6d0256f311",
    measurementId: "G-ZVWB2NX35S"
});


const messaging = firebase.messaging();
