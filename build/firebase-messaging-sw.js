importScripts("https://www.gstatic.com/firebasejs/7.9.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.3/firebase-messaging.js");
firebase.initializeApp({
  // Project Settings => Add Firebase to your web app
    apiKey: "AIzaSyDHYmK4k6bPgHmYBCvQIlgF7gfZCC--Uao",
    authDomain: "plunesfirebase.firebaseapp.com",
    databaseURL: "https://plunesfirebase.firebaseio.com",
    projectId: "plunesfirebase",
    storageBucket: "plunesfirebase.appspot.com",
    messagingSenderId: "966445733996",
    appId: "1:966445733996:web:35c60084892d30940ee049"
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
  return promiseChain;
});
self.addEventListener('notificationclick', function(event) {
  // do what you want
  // ...
});