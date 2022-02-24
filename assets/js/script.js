var searchButton = document.getElementById("searchBtn");
var navContainer = document.getElementById("navContainer");
var userInput = document.getElementById("charSearch");
var savedSearches = JSON.parse(localStorage.getItem("hero")) || [];
var currentSearch = savedSearches.length;
var imdbApiStart = "https://imdb-api.com/en/API/Search/";
var imdbKey = "k_zcmn64r8/";
var marvelApiStart =
  "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=";
var marvelKey = "382f5c01d7625f70f8568701339fda29";
var ts = "thesoer";
var passhash = "e19ce609473ab49e72381d59be07f3e1";

function getHeroInfo() {
  var requestUrl =
    "https://gateway.marvel.com/v1/public/characters?ts=" +
    ts +
    "&apikey=" +
    marvelKey +
    "&hash=" +
    passhash +
    "&nameStartsWith=" +
    userInput.value;
  console.log(requestUrl);
  var result = fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      postHeroInfo(data);
    });

  return result;
}

function getMovieInfo(userSearch) {
  var requestUrl = imdbApiStart + imdbKey + userSearch;
  var result = fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      postMovieInfo(data);
    });
  return result;
}

function postHeroInfo(data) {
  for (i = 0; i < 10; i++) {
    console.log(data.data.results[i].name);
    var createButton = document.createElement("button");
    createButton.textContent = data.data.results[i].name;
    createButton.classList = "btn btn-secondary";
    createButton.setAttribute("value", data.data.results[i].id);
    createButton.setAttribute("id", "characters");
    navContainer.append(createButton);
  }
}

// function postMovieInfo(data) {
//   var createButton = document.createElement("button");
//   createButton.textContent = 
// }

function searchCharacterId(event) {
  navContainer.innerHTML = "";
  var requestUrl =
    "https://gateway.marvel.com/v1/public/characters/" +
    event +
    "?ts=" +
    ts +
    "&apikey=" +
    marvelKey +
    "&hash=" +
    passhash;
  console.log(requestUrl);
  var result = fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      postCharacterId(data)
    });
  return result;
}

function postCharacterId (data) {
  var createHeader = document.createElement("h2");
  createHeader.textContent = data.data.results[0].name;
  var createP = document.createElement("p");
  createP.textContent = data.data.results[0].description;
  navContainer.append(createHeader);
  navContainer.append(createP);
}

searchButton.addEventListener("click", getHeroInfo);
document.addEventListener("click", function (event) {
  if (event.target.id === "characters") {
    searchCharacterId(event.target.value);
    getMovieInfo(event.target.textContent);
  } else {
    return;
  }
});
