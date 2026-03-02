let rmAllCharacters = [];

async function fetchRickAndMortyData() {
  const container = document.getElementById("remote-data-container");
  container.innerHTML = "<p>Loading Rick and Morty characters...</p>";

  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");

    if (!response.ok) {
      console.log("Fetch failed. Status:", response.status);
      container.innerHTML = '<p class="error">⚠️ Failed to load characters.</p>';
      return;
    }

    const data = await response.json();
    rmAllCharacters = data.results;

    displayRickAndMortyData(rmAllCharacters);

  } catch (error) {
    container.innerHTML = '<p class="error">⚠️ Failed to load data. Please try again later.</p>';
    console.error("Error fetching characters:", error);
  }
}

function displayRickAndMortyData(charactersArray) {
  const container = document.getElementById("remote-data-container");
  let htmlOutput = "";

  charactersArray.forEach(character => {
    htmlOutput += `
      <div class="card">
        <img src="${character.image}" alt="${character.name}">
        <p class="name">${character.name}</p>
        <p class="meta">Status: ${character.status}</p>
        <p class="meta">Species: ${character.species}</p>
      </div>
    `;
  });

  container.innerHTML = htmlOutput;
}


// Button: load characters
document.getElementById("btn-rick-load").addEventListener("click", function () {
  fetchRickAndMortyData();

  // optional: clear search when loading
  const input = document.getElementById("rm-search");
  if (input) input.value = "";
});


// Search: filter by name (only works after loading)
const rmSearchInput = document.getElementById("rm-search");

rmSearchInput.addEventListener("input", function () {
  const query = rmSearchInput.value.trim().toLowerCase();

  // if user types before loading, show a hint
  if (rmAllCharacters.length === 0) {
    const container = document.getElementById("remote-data-container");
    container.innerHTML = `<p>Click <b>Load Characters</b> first.</p>`;
    return;
  }

  const filtered = rmAllCharacters.filter(character =>
    character.name.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    const container = document.getElementById("remote-data-container");
    container.innerHTML = `<p>No characters found for "<b>${rmSearchInput.value}</b>".</p>`;
    return;
  }

  displayRickAndMortyData(filtered);
});