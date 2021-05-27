import firebase from 'firebase/app';
import 'firebase/auth';

let app;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)

} else {
  app = firebase.app();
}

export const auth = app.auth();
export default app;

/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD2IVs9jw6yL88VPsD3Rx7EikZPqfgDITg",
    authDomain: "cardshare-3263b.firebaseapp.com",
    projectId: "cardshare-3263b",
    storageBucket: "cardshare-3263b.appspot.com",
    messagingSenderId: "677993611062",
    appId: "1:677993611062:web:8f41cb3230063545dffd97"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
*/