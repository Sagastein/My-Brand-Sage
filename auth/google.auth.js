import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyC3R4bB-vsaa5PRs0z5cMUThy4tijlU6n8",
  authDomain: "my-brand-sage.firebaseapp.com",
  projectId: "my-brand-sage",
  storageBucket: "my-brand-sage.appspot.com",
  messagingSenderId: "415429399440",
  appId: "1:415429399440:web:0063b4d619cb60b23cd915",
  measurementId: "G-F5NKNCZ64K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
auth.languageCode = "en";
const provider = new GoogleAuthProvider();
const googleSignIn = document.getElementById("login-with-google-btn");
googleSignIn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      // let users = [];
      // let storedUsers = localStorage.getItem("users") || [];
      // console.log(storedUsers);
      // if (storedUsers) {
      //   users = JSON.parse(storedUsers);
      //   users.push(user);
      //   localStorage.setItem("users", JSON.stringify(users));
      // }

      console.log(user);
      if (user) {
        localStorage.setItem("auth", JSON.stringify(user));
        window.location.href = "../admin/index.html";
      }
    })
    .catch((error) => {
      console.log(error);
      alert("Error Login with google sign-in. Please try again.");
    });
});
