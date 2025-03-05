const key = "d9e0fc277daee1e1a9dad1c05377a8ec";

const searchBtn = document.getElementById("search-btn");
const searchInp = document.getElementById("search");
const country = document.getElementById("country");
const temperature = document.getElementById("temperature");
const tempImg = document.getElementById("temp-img");
const realFeel = document.getElementById("info-2");
const sunRise = document.getElementById("sun-rise");
const sunSet = document.getElementById("sun-set");
const latitude = document.getElementById("lat");
const longitude = document.getElementById("long");
const windSpeed = document.getElementById("wind-speed");
const windDegree = document.getElementById("wind-degree");
const description = document.getElementById("des-status");
const minTemp = document.getElementById("min");
const maxTemp = document.getElementById("max");
const humidity = document.getElementById("humidity-info");
const visibility = document.getElementById("visibility-info");
const pressure = document.getElementById("pressure-info");
const ground = document.getElementById("ground-info");
const sea = document.getElementById("sea-info");
const temperatureImg = document.getElementById("temperature");
const mainTemp = document.getElementById("main-temp");
const geoBtn = document.createElement("button");
const geoIcon = document.createElement("span");

geoBtn.innerText = " Get Weather";
geoIcon.innerHTML = "\u{1F4CD}";
geoIcon.style.marginLeft = "8px";
geoBtn.appendChild(geoIcon);

geoBtn.style.position = "absolute";
geoBtn.style.bottom = "20px";
geoBtn.style.right = "20px";
geoBtn.style.padding = "10px 20px";
geoBtn.style.border = "none";
geoBtn.style.borderRadius = "20px";
geoBtn.style.backgroundColor = "#007BFF";
geoBtn.style.color = "white";
geoBtn.style.fontSize = "16px";
geoBtn.style.cursor = "pointer";
geoBtn.style.display = "flex";
geoBtn.style.alignItems = "center";
geoBtn.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
document.body.appendChild(geoBtn);

geoBtn.addEventListener("mouseover", () => {
  geoBtn.style.backgroundColor = "#0056b3";
});

geoBtn.addEventListener("mouseout", () => {
  geoBtn.style.backgroundColor = "#007BFF";
});

const EpochConverter = (epTime) => {
  let d = new Date(0);
  d.setUTCSeconds(epTime);
  return d;
};

const fetchWeather = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      country.innerText = data.name;
      temperatureImg.innerHTML = `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"> ${data.main.temp}`;
      realFeel.innerText = `Real feel: ${data.main.feels_like}`;
      sunRise.innerText = `Sunrise: ${EpochConverter(data.sys.sunrise).toTimeString().split(":")[0]} : ${EpochConverter(data.sys.sunrise).toTimeString().split(":")[1]} AM`;
      sunSet.innerText = `Sunset: ${EpochConverter(data.sys.sunset).toTimeString().split(":")[0]} : ${EpochConverter(data.sys.sunset).toTimeString().split(":")[1]} PM`;
      latitude.innerText = `Latitude: ${data.coord.lat}`;
      longitude.innerText = `Longitude: ${data.coord.lon}`;
      windSpeed.innerText = `Wind Speed: ${data.wind.speed}`;
      windDegree.innerText = `Wind Direction: ${data.wind.deg}`;
      description.innerText = `${data.weather[0].description}`;
      minTemp.innerText = `Min-temp: ${data.main.temp_min}`;
      maxTemp.innerText = `Max-temp: ${data.main.temp_max}`;
      humidity.innerText = `${data.main.humidity}`;
      visibility.innerText = data.visibility;
      pressure.innerText = data.main.pressure;
      ground.innerText = data.main.grnd_level || "N/A";
      sea.innerText = data.main.sea_level || "N/A";
    })
    .catch(() => {
      country.innerText = "Data not found";
    });
};

searchBtn.addEventListener("click", () => {
  const cityValue = searchInp.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
  fetchWeather(url);
});

geoBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
      fetchWeather(url);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
      fetchWeather(url);
    });
  }
});
