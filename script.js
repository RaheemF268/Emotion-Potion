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
    color: "#6495ED" // Brightened Steel Blue for better contrast
  },
  energetic: {
    music: [
      { name: "Mash It Up - Burning Flames", link: "https://youtu.be/6L0JWa-CDzo?si=_mu1OQwyHEmv0hAl" },
      { name: "Lose Yourself - Eminem", link: "https://www.youtube.com/watch?v=_Yhyp-_hX2s" },
      { name: "Stronger - Kanye West", link: "https://www.youtube.com/watch?v=PsO6ZnUZI0g" }
    ],
    activity: "Do a quick 10-minute workout! 🏋️",
    color: "#FF6347" // Brightened Orange Red for better contrast
  },
  relaxed: {
    music: [
      { name: "Sweet Antigua - Drastic", link: "https://youtu.be/UvUWeBoXeGk?si=Il-75AzfZ47bpS0z" },
      { name: "Smile Jamaica - Chronixx", link: "https://youtu.be/vofff0Ei3kk?si=uWuJJTwkTpJAJfgz" },
      { name: "Three Little Birds - Bob Marley", link: "https://www.youtube.com/watch?v=zaGUr6wzyT8" }
    ],
    activity: "Try a 5-minute meditation session. 🧘",
    color: "#8A7BFF" // Brightened Medium Slate Blue for better contrast
  }
};

// Get DOM elements
const moodButtons = document.querySelectorAll(".mood-buttons button");
const musicList = document.getElementById("music-list");
const activityText = document.getElementById("activity-text");
const liquid = document.querySelector(".liquid");
const potionTitle = document.querySelector("#potion-title");
const historyList = document.getElementById("history-list");
const potionBottle = document.querySelector(".potion-bottle");
const particlesContainer = document.querySelector(".particles-container");

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
  
  // Reset the position of bubbles for new animation
  resetBubbles();
  
  // After a delay, show the completion effects
  setTimeout(() => {
    liquid.style.height = "80%";
    
    // Add a glow effect to the bottle
    potionBottle.style.setProperty('--potion-color', data.color);
    potionBottle.classList.add('potion-complete');
    
    // Create magical particles
    createParticles(data.color);
    
    // Remove glow effect after animation completes
    setTimeout(() => {
      potionBottle.classList.remove('potion-complete');
    }, 2000);
    
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
      link.style.color = "#ff5a76"; // Updated for better contrast
      link.style.textDecoration = "none";
      link.style.transition = "color 0.3s";
      link.addEventListener("mouseover", () => {
        link.style.color = "#ff8c98";
      });
      link.addEventListener("mouseout", () => {
        link.style.color = "#ff5a76";
      });
      li.appendChild(link);
      musicList.appendChild(li);
    });

    // Display activity suggestion
    activityText.textContent = data.activity;
  }, 1000);
}

// Function to create particles
function createParticles(color) {
  // Clear any existing particles
  particlesContainer.innerHTML = '';
  
  // Create new particles
  const particleCount = 25;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size
    const size = Math.random() * 8 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random starting position
    const startX = 50 + (Math.random() * 40 - 20);
    const startY = 100;
    particle.style.left = `${startX}%`;
    particle.style.top = `${startY}px`;
    
    // Random end position
    const tx = (Math.random() * 200 - 100);
    const ty = (Math.random() * -200 - 50);
    const rotation = Math.random() * 360;
    
    // Set custom properties for the animation
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);
    particle.style.setProperty('--r', `${rotation}deg`);
    
    // Set color - mix the potion color with some white for sparkle effect
    particle.style.backgroundColor = color;
    particle.style.boxShadow = `0 0 ${size}px ${color}`;
    
    // Set animation
    const duration = Math.random() * 2 + 1;
    const delay = Math.random() * 0.5;
    particle.style.animation = `float ${duration}s ease-out ${delay}s`;
    
    // Add to container
    particlesContainer.appendChild(particle);
  }
}

// Function to reset bubble animations
function resetBubbles() {
  const bubbles = document.querySelectorAll('.bubble-1, .bubble-2, .bubble-3');
  bubbles.forEach(bubble => {
    // Remove and reattach to restart animation
    const parent = bubble.parentNode;
    const clone = bubble.cloneNode(true);
    parent.removeChild(bubble);
    parent.appendChild(clone);
  });
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
