 
 

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

const EpochConverrter = (epTime) => {
  let d = new Date(0);
  d.setUTCSeconds(epTime);
  return d;
};
searchBtn.addEventListener("click", () => {
  const cityValue = searchInp.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      country.innerText = data.name;
      temperatureImg.innerHTML = `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"> ${data.main.temp}`;
      realFeel.innerText = `Real feel: ${data.main.feels_like}`;
      sunRise.innerText = `Sunrise: ${
        EpochConverrter(data.sys.sunrise)
          .toTimeString()
          .split(" ")[0]
          .split(":")[0]
      } : ${
        EpochConverrter(data.sys.sunrise)
          .toTimeString()
          .split(" ")[0]
          .split(":")[1]
      }   AM`;
      sunSet.innerText = `Sunset: ${
        EpochConverrter(data.sys.sunset)
          .toTimeString()
          .split(" ")[0]
          .split(":")[0]
      } : ${
        EpochConverrter(data.sys.sunset)
          .toTimeString()
          .split(" ")[0]
          .split(":")[1]
      }   PM`;
      latitude.innerText = `Lattitude: ${data.coord.lat}`;
      longitude.innerText = `Longitude: ${data.coord.lon}`;
      windSpeed.innerText = `Wind Speed: ${data.wind.speed}`;
      windDegree.innerText = `Wind Direction: ${data.wind.deg}`;
      description.innerText = `${data.weather[0].description}`;
      minTemp.innerText = `Min-temp: ${data.main.temp_min}`;
      maxTemp.innerText = `Max-temp: ${data.main.temp_max}`;
      humidity.innerText = `${data.main.humidity}`;
      visibility.innerText = data.visibility;
      pressure.innerText = data.main.pressure;
      ground.innerText = data.main.grnd_level;
      sea.innerText = data.main.sea_level;
    })
    .catch((error) => {
      country.innerText = "Data not found";
    });
});
