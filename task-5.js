const apiKey = 'YOUR_API_KEY'; // Replace with your API key

const locationInput = document.getElementById('location');
const searchButton = document.getElementById('search-btn');
const weatherDataDiv = document.getElementById('weather-data');

function getWeatherData(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const city = data.name;
      const weather = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;

      weatherDataDiv.innerHTML = `
        <h2>Weather in ${city}</h2>
        <p><b>Conditions:</b> ${weather} - ${description}</p>
        <p><b>Temperature:</b> ${temp}°C</p>
      `;
    })
    .catch(error => {
      console.error(error);
      weatherDataDiv.innerHTML = '<p>Error: Could not find weather data.</p>';
    });
}

searchButton.addEventListener('click', () => {
  const location = locationInput.value;
  if (location) {
    getWeatherData(location);
  } else {
    // Handle case where no location is entered
  }
});

// Get user location (optional)
navigator.geolocation.getCurrentPosition(position => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  // Use lat and lon to get weather data
  // getWeatherData(lat, lon); // Replace with API call for location by coordinates
});