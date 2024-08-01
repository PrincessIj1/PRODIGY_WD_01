const apiKey = '733d06d8112fa0c758415f1708620571';

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchbutton');
  const locationInput = document.getElementById('locationinput');
  const weatherInfo = document.getElementById('weatherinfo');
  const weatherDetailsPage = document.getElementById('weatherdetailspage');
  const backButton = document.getElementById('backbutton');

  searchButton.addEventListener('click', async () => {
    const location = locationInput.value.trim();
    if (location) {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === 200) {
          displayWeather(data);
          togglePages();
        } else {
          weatherInfo.innerHTML = `<p style="color: red;">Error: ${data.message}</p>`;
        }
      } catch (error) {
        weatherInfo.innerHTML = `<p style="color: red;">Error fetching data.</p>`;
      }
    }
  });

  backButton.addEventListener('click', () => {
    togglePages();
  });

  function togglePages() {
    document.querySelector('.headercontainer').classList.toggle('hide');
    weatherDetailsPage.classList.toggle('hide');
    weatherDetailsPage.classList.toggle('show');
  }

  function displayWeather(data) {
    const { name, main, weather, wind, sys } = data;
    const temperature = Math.round(main.temp);
    const feelsLike = Math.round(main.feels_like);
    const weatherDescription = weather[0].description;
    const humidity = main.humidity;
    const pressure = main.pressure;
    const windSpeed = wind.speed;
    const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(sys.sunset * 1000).toLocaleTimeString();

    weatherInfo.innerHTML = `
      <h2>Weather in ${name}</h2>
      <p><strong>Temperature:</strong> ${temperature}°C</p>
      <p><strong>Feels Like:</strong> ${feelsLike}°C</p>
      <p><strong>Condition:</strong> ${weatherDescription}</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Pressure:</strong> ${pressure} hPa</p>
      <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
      <p><strong>Sunrise:</strong> ${sunrise}</p>
      <p><strong>Sunset:</strong> ${sunset}</p>
    `;
  }
});
