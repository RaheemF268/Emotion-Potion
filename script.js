// Mock data for music and activities
const moodData = {
  happy: {
    music: [
      { name: "Uptown Funk - Bruno Mars", link: "https://www.youtube.com/watch?v=OPf0YbXqDm0" },
      { name: "Could You Be Loved - Bob Marley", link: "https://www.youtube.com/watch?v=Ch4V0V072Fw" },
      { name: "Happy - Pharrell Williams", link: "https://www.youtube.com/watch?v=ZbZSe6N_BXs" }
    ],
    activity: "Dance like nobody's watching! 💃"
  },
  sad: {
    music: [
      { name: "Someone Like You - Adele", link: "https://www.youtube.com/watch?v=hLQl3WQQoQ0" },
      { name: "Fix You - Coldplay", link: "https://www.youtube.com/watch?v=k4V3Mo61fJM" },
      { name: "everything i wanted - Billie Eilish", link: "https://www.youtube.com/watch?v=EgBJmlPo8Xw" }
    ],
    activity: "Write down three things you're grateful for. 📝"
  },
  energetic: {
    music: [
      { name: "Mash It Up - Burning Flames", link: "https://www.youtube.com/watch?v=5Z9i3K1YlUc" },
      { name: "Lose Yourself - Eminem", link: "https://www.youtube.com/watch?v=_Yhyp-_hX2s" },
      { name: "Stronger - Kanye West", link: "https://www.youtube.com/watch?v=PsO6ZnUZI0g" }
    ],
    activity: "Do a quick 10-minute workout! 🏋️"
  },
  relaxed: {
    music: [
      { name: "Sweet Antigua - Drastic", link: "https://www.youtube.com/watch?v=6Z0qYp7YJhE" },
      { name: "Smile Jamaica - Chronixx", link: "https://www.youtube.com/watch?v=3Z8FZ6Z6Z6Y" },
      { name: "Three Little Birds - Bob Marley", link: "https://www.youtube.com/watch?v=zaGUr6wzyT8" }
    ],
    activity: "Try a 5-minute meditation session. 🧘"
  }
};

// Get DOM elements
const moodButtons = document.querySelectorAll(".mood-buttons button");
const musicList = document.getElementById("music-list");
const activityText = document.getElementById("activity-text");
const liquid = document.querySelector(".liquid");

// Add event listeners to mood buttons
moodButtons.forEach(button => {
  button.addEventListener("click", () => {
    const mood = button.getAttribute("data-mood");
    mixPotion(mood);
  });
});

// Function to mix the potion and show recommendations
function mixPotion(mood) {
  const data = moodData[mood];

  // Animate the liquid in the potion bottle
  liquid.style.height = "100%";
  setTimeout(() => {
    liquid.style.height = "0";
  }, 1000);

  // Clear previous recommendations
  setTimeout(() => {
    musicList.innerHTML = "";
    activityText.textContent = "";

    // Display music recommendations
    data.music.forEach(song => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = song.link;
      link.target = "_blank"; // Open link in a new tab
      link.textContent = song.name;
      link.style.color = "#e94560"; // Magical red color for links
      link.style.textDecoration = "none";
      link.style.transition = "color 0.3s";
      link.addEventListener("mouseover", () => {
        link.style.color = "#ff6b6b"; // Lighter red on hover
      });
      link.addEventListener("mouseout", () => {
        link.style.color = "#e94560"; // Restore original color
      });
      li.appendChild(link);
      musicList.appendChild(li);
    });

    // Display activity suggestion
    activityText.textContent = data.activity;
  }, 1000);
}
