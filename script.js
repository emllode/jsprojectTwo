/* 
Använder fetch + promise när jag använder mina API:er. Fetchar URL och inväntar response genom .then
och sedan får jag ett objekt som jag då manipulerar och tar ut den informationen jag vill ha som jag
sedan använder DOM-kod för att publicera på min hemsida.
 */

const submitBtn = document.querySelector(".submit");
const inputValue = document.querySelector(".search");

/* ----------------- Event to check checkboxes with button pushed ----------- */
submitBtn.addEventListener("click", () => {
  const checkboxOne = document.getElementById("weather").checked;
  const checkboxTwo = document.querySelector(".attractionsChecked").checked;
  const checkboxThree = document.querySelector(".AToZChecked").checked;

  toggleForWindow(); //Toggle första gångne man söker.

  if (checkboxOne == true && checkboxTwo == true && checkboxThree == true) {
    return allThree();
  } else if (checkboxOne == true && checkboxTwo == true) {
    return twoAPI();
  } else if (checkboxTwo == true && checkboxThree == true) {
    return AtoZ();
  } else if (checkboxOne == true) {
    return weatherFetch();
  } else if (checkboxTwo == true) {
    attractionsFetch();
  } else if (checkboxThree == true) {
    alert("You have nothing to A-Z order");
  } else {
    alert("you have not checked anything.");
  }
});

/* Toggle first time you do search */
function toggleForWindow() {
  const x = document.querySelector(".container");
  if (x.style.display === "none") {
    x.style.display = "block";
  }
}

/*       --------- function to create new divs to put inside attractions ----------------- */
function newDivs(d) {
  let mainDiv = document.querySelector(".container__attractions");
  let newDiv = document.createElement("div");
  newDiv.className = "container__attraction";
  newDiv.innerHTML = d;
  mainDiv.prepend(newDiv);
}

/* -------------- Todays date -------------- */
let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();

let todaysDate = `${yyyy}${mm}${dd}`;

const clientID = "WDLO4HOSFVLGZ35SQ2B4UU5VZ1IC2FR4MPO5XXT3YPKQMYGE&";
const clientSecret = "HAYLD2KRQQI2SRWW1IRJ1TPMT2IZP5BVR5N2DVUZAYPCJLJU";
const url = "https://api.foursquare.com/v2/venues/search?";

/*----------------- Token for FourSquare with date ------------ */
const token = `${url}&client_id=${clientID}&client_secret=${clientSecret}&v=${todaysDate}`;

/*        -------------- API-fetch for attractions -------------- */

function attractionsFetch() {
  fetch(
    `${token}&near=` + inputValue.value + `&intent=browse&radius=10000&limit=10`
  )
    .then((response) => response.json())
    .then((data) => {
      let location = data.response.venues.map((l) => l.name);
      location.forEach((e) => newDivs(e));
    })
    .catch(() => alert("That city doesn't exist."));
}

/* ------------- Fick inte ett if-statement att funka i attractionFetch koden, så fick skapa ny funktion för AtoZ.... ------------ */
function AtoZ() {
  fetch(
    `${token}&near=` + inputValue.value + `&intent=browse&radius=10000&limit=10`
  )
    .then((response) => response.json())
    .then((data) => {
      let location = data.response.venues.map((l) => l.name);
      location
        .sort()
        .reverse()
        .forEach((e) => newDivs(e));
    })
    .catch(() => alert("That city doesn't exist."));
}

/*      -----------      API-fetch for weather        ---------------    */
function weatherFetch() {
  const nameOfCity = document.querySelector(".name");
  const temp = document.querySelector(".temp");
  const desc = document.querySelector(".desc");

  const urlWeather =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  const weatherId = "&appid=9c8183e6cf109ae7637aab10a479748e";
  //Fetchar api för weather. Tar in input i url.
  fetch(`${urlWeather}` + inputValue.value + `${weatherId}`) //Fetchar URL för nå API:n
    .then((r) => r.json()) //slänger in det i JSON format + inväntar så det laddas klart.
    .then((data) => {
      //Möjlighet att plocka data från JSON filen
      let nameValue = data["name"];
      let tempValue = Math.round(data["main"]["temp"]); //avrundar till heltal
      let descValue = data["weather"][0]["description"];
      let iconCode = data["weather"][0]["icon"];
      let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

      document.getElementById("iconWeather").src = iconUrl;
      nameOfCity.innerHTML = nameValue;
      temp.innerHTML = tempValue + "&deg";
      desc.innerHTML = descValue;
    })
    // Fångar om staden inte existerar i API:n och slänger ut ett alert
    .catch(() => alert("That city doesn't exist."));
}

/* Skapar nya funktioner som tar andra fumktioner så jag kan tillkalal dom i min if/else. */
function allThree() {
  weatherFetch();
  AtoZ();
}
function twoAPI() {
  attractionsFetch();
  weatherFetch();
}
