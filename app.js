import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const firebaseConfig = {
  projectId: "html-game-1-236a9",
  databaseURL: "https://html-game-1-236a9-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// DOM Elements
const authSection = document.getElementById("auth-section");
const gameSection = document.getElementById("game-section");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const scoreVal = document.getElementById("scoreVal");

let currentScore = 0;
let userScoreRef = null;

// Auth State Listener (Handles auto-login on refresh!)
onAuthStateChanged(auth, (user) => {
  if (user) {
    authSection.style.display = "none";
    gameSection.style.display = "block";

    // Save score under user's unique ID
    userScoreRef = ref(database, `users/${user.uid}/score`);

    // Load save game
    onValue(userScoreRef, (snapshot) => {
      currentScore = snapshot.val() || 0;
      scoreVal.innerText = currentScore;
    });
  } else {
    authSection.style.display = "block";
    gameSection.style.display = "none";
    userScoreRef = null;
  }
});

// Register
document.getElementById("registerBtn").addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .catch(err => alert(err.message));
});

// Login
document.getElementById("loginBtn").addEventListener("click", () => {
  signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .catch(err => alert(err.message));
});

// Game Button
document.getElementById("scoreBtn").addEventListener("click", () => {
  if (userScoreRef) {
    set(userScoreRef, currentScore + 10);
  }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth);
});
