// Mock data for music and activities
const moodData = {
  happy: {
    music: [
      { name: "Uptown Funk - Bruno Mars", link: "https://www.youtube.com/watch?v=OPf0YbXqDm0" },
      { name: "Could You Be Loved - Bob Marley", link: "https://youtu.be/g3t6YDnGXAc?si=2Y0t-A9sqlJkzO3A" },
      { name: "Happy - Pharrell Williams", link: "https://www.youtube.com/watch?v=ZbZSe6N_BXs" }
    ],
    activity: "Dance like nobody's watching! 💃",
    color: "#FFD700" // Gold
  },
  sad: {
    music: [
      { name: "Someone Like You - Adele", link: "https://www.youtube.com/watch?v=hLQl3WQQoQ0" },
      { name: "Fix You - Coldplay", link: "https://www.youtube.com/watch?v=k4V3Mo61fJM" },
      { name: "everything i wanted - Billie Eilish", link: "https://www.youtube.com/watch?v=EgBJmlPo8Xw" }
    ],
    activity: "Write down three things you're grateful for. 📝",
    color: "#4682B4" // Steel Blue
  },
  energetic: {
    music: [
      { name: "Mash It Up - Burning Flames", link: "https://youtu.be/6L0JWa-CDzo?si=_mu1OQwyHEmv0hAl" },
      { name: "Lose Yourself - Eminem", link: "https://www.youtube.com/watch?v=_Yhyp-_hX2s" },
      { name: "Stronger - Kanye West", link: "https://www.youtube.com/watch?v=PsO6ZnUZI0g" }
    ],
    activity: "Do a quick 10-minute workout! 🏋️",
    color: "#FF4500" // Orange Red
  },
  relaxed: {
    music: [
      { name: "Sweet Antigua - Drastic", link: "https://youtu.be/UvUWeBoXeGk?si=Il-75AzfZ47bpS0z" },
      { name: "Smile Jamaica - Chronixx", link: "https://youtu.be/vofff0Ei3kk?si=uWuJJTwkTpJAJfgz" },
      { name: "Three Little Birds - Bob Marley", link: "https://www.youtube.com/watch?v=zaGUr6wzyT8" }
    ],
    activity: "Try a 5-minute meditation session. 🧘",
    color: "#7B68EE" // Medium Slate Blue
  }
};

// Get DOM elements
const moodButtons = document.querySelectorAll(".mood-buttons button");
const musicList = document.getElementById("music-list");
const activityText = document.getElementById("activity-text");
const liquid = document.querySelector(".liquid");
const potionTitle = document.querySelector("#potion-title");
const historyList = document.getElementById("history-list");

let history = [];

// Add event listeners to mood buttons
moodButtons.forEach(button => {
  button.addEventListener("click", () => {
    const mood = button.getAttribute("data-mood");
    
    // Visual feedback on button click
    button.classList.add("selected");
    setTimeout(() => {
      button.classList.remove("selected");
    }, 500);
    
    // Play sound effect
    playPotionSound();
    
    mixPotion(mood);
  });
});

// Function to play potion mixing sound
function playPotionSound() {
  const sound = new Audio('sounds/potion-sound.mp3'); // Update this path to where you store your sound
  sound.volume = 0.3;
  sound.play().catch(error => console.log("Audio playback failed:", error));
}

// Function to mix the potion and show recommendations
function mixPotion(mood) {
  const data = moodData[mood];

  // Update potion title
  potionTitle.textContent = `Your ${mood.charAt(0).toUpperCase() + mood.slice(1)} Potion`;

  // Animate the liquid in the potion bottle with mood color
  liquid.style.backgroundColor = data.color;
  liquid.style.height = "100%";
  setTimeout(() => {
    liquid.style.height = "80%";
  }, 1000);

  // Add to history
  addToHistory(mood);

  // Clear previous recommendations
  setTimeout(() => {
    musicList.innerHTML = "";
    activityText.textContent = "";

    // Display music recommendations
    data.music.forEach(song => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = song.link;
      link.target = "_blank";
      link.textContent = song.name;
      link.style.color = "#e94560";
      link.style.textDecoration = "none";
      link.style.transition = "color 0.3s";
      link.addEventListener("mouseover", () => {
        link.style.color = "#ff6b6b";
      });
      link.addEventListener("mouseout", () => {
        link.style.color = "#e94560";
      });
      li.appendChild(link);
      musicList.appendChild(li);
    });

    // Display activity suggestion
    activityText.textContent = data.activity;
  }, 1000);
}

// Function to add mood to history
function addToHistory(mood) {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  history.unshift({
    mood: mood,
    time: timeString
  });
  
  // Keep only last 5 entries
  if (history.length > 5) {
    history.pop();
  }
  
  // Update history display
  updateHistoryDisplay();
}

// Function to update history display
function updateHistoryDisplay() {
  if (!historyList) return;
  
  historyList.innerHTML = "";
  
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.time}: ${item.mood.charAt(0).toUpperCase() + item.mood.slice(1)}`;
    li.addEventListener("click", () => {
      mixPotion(item.mood);
    });
    historyList.appendChild(li);
  });
}

// Random mood button functionality
document.getElementById("random-mood").addEventListener("click", () => {
  const moods = Object.keys(moodData);
  const randomMood = moods[Math.floor(Math.random() * moods.length)];
  
  // Visual feedback
  document.querySelector(`[data-mood="${randomMood}"]`).classList.add("selected");
  setTimeout(() => {
    document.querySelector(`[data-mood="${randomMood}"]`).classList.remove("selected");
  }, 500);
  
  // Play sound and mix potion
  playPotionSound();
  mixPotion(randomMood);
});