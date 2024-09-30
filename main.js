const apiKey = `5a0ef256f1da860efcef21eacd326877`;
const api = `https://api.openweathermap.org/data/2.5/weather?units=metric`;

async function getApi(cityName) {
  const apiUrl = await fetch(`${api}&q=${cityName}&appid=${apiKey}`);
  console.log(apiUrl);

  if (apiUrl.status == 404) {
    document.querySelector(".error").style.cssText = "display:block;";
  } else {
    document.querySelector(".error").style.cssText = "display:none;";
    let change = document.querySelector(".change");
    let data = await apiUrl.json();
    console.log(data);
    document.querySelector(".card").classList.remove("no");
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent =
      Number.parseInt(data.main.temp) + `°C`;
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
    document.querySelector(".wind").textContent = `${data.wind.speed} Km/h`;

    if (data.weather[0]["main"] === "Clouds") {
      change.src = "images/clouds.png";
    } else if (data.weather[0]["main"] === "Clear") {
      change.src = "images/clear.png";
    } else if (data.weather[0]["main"] === "Rain") {
      change.src = "images/rain.png";
    } else if (data.weather[0]["main"] === "Drizzle") {
      change.src = "images/drizzle.png";
    } else if (data.weather[0]["main"] === "Mist") {
      change.src = "images/mist.png";
    } else if (data.weather[0]["main"] === "Snow") {
      change.src = "images/snow.png";
    }
  }
}

document.querySelector("button").addEventListener("click", () => {
  let city = document.querySelector("input");
  getApi(city.value);
  city.value = "";
  console.log(city);
});
