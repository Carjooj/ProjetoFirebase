import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js'
import { getAuth , signInWithPopup , GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

import firebaseConfig from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


document.getElementById("btnlogin").addEventListener("click",teste)

function teste() {
    signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      const divresul = document.createElement("div")

      var msg = document.createTextNode("Bem vindo " 
      + result._tokenResponse.displayName);

      divresul.appendChild(msg);

      document.body.insertBefore(divresul, null);
  }).catch((error) => {
      console.log(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  
  
  
}