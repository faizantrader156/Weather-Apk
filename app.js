// ==========================================
// WEATHER APP JAVASCRIPT LOGIC (PROJECT #03)
// ==========================================

const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const weatherCard = document.getElementById('weather-card');
const initialMsg = document.getElementById('initial-msg');
const errorMsg = document.getElementById('error-msg');

const cityNameEl = document.getElementById('city-name');
const weatherIconEl = document.getElementById('weather-icon');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('wind-speed');

// OpenWeather API Key
const API_KEY = 'dee5388a5ddd0ea88e89f8e362afae06'; 

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cityName = cityInput.value.trim();
    if (cityName !== '') {
        fetchWeatherData(cityName);
    }
});

async function fetchWeatherData(city) {
    try {
        initialMsg.style.display = 'none';
        errorMsg.style.display = 'none';
        weatherCard.classList.remove('active');

        // Fetching data from OpenWeather API with URL encoding for city names
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeatherData(data);

    } catch (error) {
        errorMsg.style.display = 'block';
        weatherCard.classList.remove('active');
    }
}

function displayWeatherData(data) {
    const cityName = data.name;
    const country = data.sys.country;
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const weatherMain = data.weather[0].main;

    cityNameEl.textContent = `${cityName}, ${country}`;
    temperatureEl.textContent = `${temp}°C`;
    descriptionEl.textContent = description;
    humidityEl.textContent = `${humidity}%`;
    windSpeedEl.textContent = `${windSpeed} m/s`;

    // Dynamic Weather Icon Mapping
    setWeatherIcon(weatherMain);

    weatherCard.classList.add('active');
}

function setWeatherIcon(mainCondition) {
    weatherIconEl.innerHTML = '';
    const icon = document.createElement('i');

    switch (mainCondition.toLowerCase()) {
        case 'clear':
            icon.className = 'fa-solid fa-sun';
            break;
        case 'clouds':
            icon.className = 'fa-solid fa-cloud';
            break;
        case 'rain':
            icon.className = 'fa-solid fa-cloud-rain';
            break;
        case 'drizzle':
            icon.className = 'fa-solid fa-cloud-sun-rain';
            break;
        case 'thunderstorm':
            icon.className = 'fa-solid fa-bolt';
            break;
        case 'snow':
            icon.className = 'fa-solid fa-snowflake';
            break;
        default:
            icon.className = 'fa-solid fa-smog';
            break;
    }

    weatherIconEl.appendChild(icon);
}