// Configuration
const sitename = "yenom."; 
const subtext = "v1.2"; 
const serverUrl1 = "https://gms.parcoil.com";
const gamesData = [];

// Set site title and subtitle dynamically
document.title = `${document.title} | ${sitename}`;
document.getElementById("title").innerHTML = sitename;
document.getElementById("subtitle").innerHTML = subtext;

// Fetch and display games
function displayFilteredGames(filteredGames) {
  const gamesContainer = document.getElementById("gamesContainer");
  gamesContainer.innerHTML = ""; // Clear existing games

  filteredGames.forEach((game) => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    const gameImage = document.createElement("img");
    gameImage.src = `${serverUrl1}/${game.url}/${game.image}`;
    gameImage.alt = game.name;
    gameImage.onclick = () => window.location.href = `play.html?gameurl=${game.url}/`;

    const gameName = document.createElement("p");
    gameName.textContent = game.name;

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameName);
    gamesContainer.appendChild(gameDiv);
  });
}

// Handle search input to filter games
function handleSearchInput() {
  const searchInputValue = document.getElementById("searchInput").value.toLowerCase();
  const filteredGames = gamesData.filter(game =>
    game.name.toLowerCase().includes(searchInputValue)
  );
  displayFilteredGames(filteredGames);
}

// Fetch game data and initialize
fetch("./config/games.json")
  .then(response => response.json())
  .then(data => {
    gamesData.push(...data);
    displayFilteredGames(data);
  })
  .catch(error => console.error("Error fetching games:", error));

// Attach search event listener
document.getElementById("searchInput").addEventListener("input", handleSearchInput);

// Import any additional JS
import "/./config/custom.js";
