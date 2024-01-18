// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAEOglmJy2QnccVcwyUf8lZUSts4zfzG-4",
  authDomain: "drgo-aa24d.firebaseapp.com",
  projectId: "drgo-aa24d",
  storageBucket: "drgo-aa24d.appspot.com",
  messagingSenderId: "490035669777",
  appId: "1:490035669777:web:3c23f2dc9b473975f23ab0",
  measurementId: "G-Y5DY0ZXBQK",
  databaseURL:
    "https://drgo-aa24d-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
