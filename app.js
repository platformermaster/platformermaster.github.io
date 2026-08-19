import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "html-game-1-236a9",
  databaseURL: "https://html-game-1-236a9-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Simple game variables
let currentScore = 0;
const scoreBtn = document.getElementById("scoreBtn");
const scoreVal = document.getElementById("scoreVal");

// Reference to a player score node in the database
const scoreRef = ref(database, 'players/player1/score');

// Listen for score changes from the database in real-time
onValue(scoreRef, (snapshot) => {
  const data = snapshot.val();
  if (data !== null) {
    currentScore = data;
    scoreVal.innerText = currentScore;
  }
});

// Update score in Firebase when the button is clicked
scoreBtn.addEventListener("click", () => {
  set(scoreRef, currentScore + 10);
});
