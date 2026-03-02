// ===================== GLOBAL =====================
let rmAllCharacters = [];


// ===================== COUNTRIES =====================
async function fetchCountriesData() {
  const container = document.getElementById("remote-data-container");
  container.innerHTML = "<p>Loading countries...</p>";

  try {
    const response = await fetch("https://restcountries.com/v3.1/region/europe");

    if (!response.ok) {
      container.innerHTML = "<p>Failed to load countries.</p>";
      return;
    }

    const data = await response.json();
    displayCountriesData(data);

  } catch (error) {
    container.innerHTML = "<p>Error loading countries.</p>";
  }
}

function displayCountriesData(countriesArray) {
  const container = document.getElementById("remote-data-container");
  let html = "";

  countriesArray.forEach(country => {
    const capital = country.capital ? country.capital[0] : "N/A";

    html += `
      <div style="border:1px solid #ccc; padding:12px; border-radius:6px; background:#fff;">
        <img src="${country.flags.png}" width="50">
        <p>
          <b>${country.name.common}</b><br>
          Capital: ${capital}<br>
          Population: ${country.population.toLocaleString()}<br>
          Region: ${country.region}
        </p>
      </div>
    `;
  });

  container.innerHTML = html;
}


// ===================== USERS =====================
async function fetchUsersData() {
  const container = document.getElementById("remote-data-container");
  container.innerHTML = "<p>Loading users...</p>";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      container.innerHTML = "<p>Failed to load users.</p>";
      return;
    }

    const data = await response.json();
    displayUsersData(data);

  } catch (error) {
    container.innerHTML = "<p>Error loading users.</p>";
  }
}

function displayUsersData(usersArray) {
  const container = document.getElementById("remote-data-container");
  let html = "";

  usersArray.forEach(user => {
    html += `
      <div style="border:1px solid #ccc; padding:12px; border-radius:6px; background:#fff;">
        <p>
          <b>${user.name} (${user.username})</b><br>
          Email: ${user.email}<br>
          Website: ${user.website}<br>
          Location: ${user.address.city}
        </p>
      </div>
    `;
  });

  container.innerHTML = html;
}


// ===================== RICK AND MORTY =====================
async function fetchRickAndMortyData() {
  const container = document.getElementById("remote-data-container");
  container.innerHTML = "<p>Loading characters...</p>";

  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");

    if (!response.ok) {
      container.innerHTML = "<p>Failed to load characters.</p>";
      return;
    }

    const data = await response.json();
    rmAllCharacters = data.results;

    displayRickAndMortyData(rmAllCharacters);

  } catch (error) {
    container.innerHTML = "<p>Error loading characters.</p>";
  }
}

function displayRickAndMortyData(characters) {
  const container = document.getElementById("remote-data-container");
  let html = "";

  characters.forEach(c => {
    html += `
      <div style="border:1px solid #ccc; padding:12px; border-radius:6px; background:#fff;">
        <img src="${c.image}" style="width:100%; max-width:180px;">
        <p>
          <b>${c.name}</b><br>
          Status: ${c.status}<br>
          Species: ${c.species}
        </p>
      </div>
    `;
  });

  container.innerHTML = html;
}


// ===================== SEARCH =====================
document.getElementById("rm-search").addEventListener("input", function () {
  const query = this.value.toLowerCase();

  const filtered = rmAllCharacters.filter(c =>
    c.name.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    document.getElementById("remote-data-container").innerHTML =
      `<p>No results found</p>`;
    return;
  }

  displayRickAndMortyData(filtered);
});


// ===================== BUTTON CONTROL =====================
document.getElementById("button-container").addEventListener("click", function (e) {

  const search = document.getElementById("rm-search");

  if (e.target.id === "btn-countries") {
    fetchCountriesData();
    search.style.display = "none";
  }

  if (e.target.id === "btn-users") {
    fetchUsersData();
    search.style.display = "none";
  }

  if (e.target.id === "btn-rick-grid") {
    fetchRickAndMortyData();
    search.style.display = "inline-block";
    search.value = "";
  }
});