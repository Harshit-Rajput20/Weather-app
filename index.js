// JavaScript in script.js

const sunElement = document.getElementById("sun");
const moonElement = document.getElementById("moon");
const starsContainer = document.getElementById("stars"); // Stars container
const timeElement = document.getElementById("time");

const centerXPercent = 50; // Center's x-coordinate percentage
const centerYPercent = 90; // Center's y-coordinate percentage
const semiMajorAxisPercent = 42; // Semi-major axis length percentage
const semiMinorAxisPercent = 90; // Semi-minor axis length percentage
// Define background colors at different completion percentages
const color0 = [133, 168, 171]; // Night (0% brightness)
const color25 = [0, 0, 0]; // Darkest color (25% brightness)
const color50 = [161, 222, 227]; // Intermediate color (50% brightness)
const color75 = [227, 232, 135]; // Brightest color (75% brightness)
const color100 = [126, 168, 168]; // Day (100% brightness)

// Function to interpolate colors based on the given percentage
function interpolateColor(color1, color2, percentage) {
  const r = Math.round(color1[0] + (color2[0] - color1[0]) * percentage);
  const g = Math.round(color1[1] + (color2[1] - color1[1]) * percentage);
  const b = Math.round(color1[2] + (color2[2] - color1[2]) * percentage);
  return `rgb(${r}, ${g}, ${b})`;
}

const changeTheme = () => {
  const GStyles = document.getElementById("globalStyle");
  if (GStyles.innerHTML.includes("color: #fff;")) {
    GStyles.innerHTML = `* {
      margin: 0;
      color: #000;
      padding: 0;
      box-sizing: border-box;
      /* color: #313030; */
      overflow: hidden;
    }`;
  } else {
    GStyles.innerHTML = `* {
      margin: 0;
      color: #fff;
      padding: 0;
      box-sizing: border-box;
      /* color: #313030; */
      overflow: hidden;
    }`;
  }
};

// Function to update the positions and background color based on the given percentage
function updatePositionsAndBackgroundColor(percentage) {
  // Calculate the position of the sun based on the given percentage
  const angle = (percentage / 100) * 2 * Math.PI;
  const centerX = centerXPercent + semiMajorAxisPercent * Math.cos(angle);
  const centerY = centerYPercent + semiMinorAxisPercent * Math.sin(angle);

  // Calculate the position of the moon, opposite to the sun
  const moonX = 2 * centerXPercent - centerX;
  const moonY = 2 * centerYPercent - centerY;

  // Set the positions of the sun and moon elements in percentages
  sunElement.style.left = `${centerX}%`;
  sunElement.style.top = `${centerY}%`;
  moonElement.style.left = `${moonX}%`;
  moonElement.style.top = `${moonY}%`;

  // Calculate the background color based on the given percentage
  let bgColor;
  if (percentage <= 25) {
    bgColor = interpolateColor(color0, color25, percentage / 25); // Interpolate between color0 and color25
  } else if (percentage <= 50) {
    bgColor = interpolateColor(color25, color50, (percentage - 25) / 25); // Interpolate between color25 and color50
  } else if (percentage <= 75) {
    bgColor = interpolateColor(color50, color75, (percentage - 50) / 25); // Interpolate between color50 and color75
  } else {
    bgColor = interpolateColor(color75, color100, (percentage - 75) / 25); // Interpolate between color75 and color100
  }

  const bodyElement = document.body;

  isSunUp = moonY > 100;

  // Update the background color based on the sun flag
  if (isSunUp) {
    bodyElement.style.backgroundColor = "rgb(77, 123, 141)"; // Day background color
    starsContainer.style.opacity = 0; // Hide stars during the day
  } else {
    bodyElement.style.backgroundColor = "rgb(0, 0, 0)"; // Night background color
    starsContainer.style.opacity = 1; // Show stars during the night
  }

  // Update the background color
  bodyElement.style.backgroundColor = bgColor;
}

function getCurrentTime() {
  const currentDate = new Date();
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  const currentTime = `${hours}:${minutes}:${seconds}`;
  return currentTime;
}
function millisecondsSinceLast6PM() {
  const now = new Date();
  const sixPm = new Date();
  sixPm.setHours(18, 0, 0, 0); // Set the time to 6 pm

  let timeDiff = now.getTime() - sixPm.getTime();
  if (timeDiff < 0) {
    // If the current time is before 6 pm, it means it's part of the next day
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0); // Set the time to midnight (start of the day)
    timeDiff = now.getTime() - midnight.getTime() + timeDiff;
  }

  return timeDiff;
}

function calculatePercentageSince6PM() {
  const currentTime = new Date();
  const sixPMToday = new Date().setHours(18, 0, 0, 0); // 6 pm today in milliseconds

  // Calculate the milliseconds passed since 6 pm
  let millisecondsPassed = currentTime.getTime() - sixPMToday;

  // If the milliseconds passed is negative, it means the current time is before 6 pm,
  // so we add the milliseconds in a day to get the correct value
  if (millisecondsPassed < 0) {
    const millisecondsInADay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    millisecondsPassed += millisecondsInADay;
  }

  // Calculate the percentage based on the milliseconds passed and the total milliseconds in a day
  const percentage = (millisecondsPassed / 86_400_000) * 100;
  return percentage;
}

// Animation function using requestAnimationFrame
let completionPercentage = 0;
function animateSunAndMoon(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsedTime = timestamp - startTime;

  // Calculate the completion percentage
  completionPercentage = (elapsedTime / animationDuration) * 100;
  updatePositionsAndBackgroundColor(calculatePercentageSince6PM());
  timeElement.innerHTML = "<div  > Time " + getCurrentTime() + "</div>";
  // Continue the animation until the duration is reached
  if (elapsedTime < animationDuration) {
    requestAnimationFrame(animateSunAndMoon);
  } else {
    // Animation is finished, reset the startTime for the next animation
    startTime = null;
    // Start the animation again to make it run infinitely
    requestAnimationFrame(animateSunAndMoon);
  }
}

// Start the animation when the page loads
let startTime;
const animationDuration = 15000; // 15 seconds
requestAnimationFrame(animateSunAndMoon);

//----------------------------------------------------------------------------------------------------------------------//

//------------------------------------------------------------------------------------------------------------------------//

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
