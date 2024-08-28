// Kode til at se hvilken dag det er og omregne det til tal så jeg kan bruge det i vejrappen
function getCurrentDayIndex() {
    const daysOfWeek = 
    ["mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag", "søndag"];
    const today = new Date();
    let dayIndex = today.getDay();
    dayIndex = (dayIndex + 6) % 7;
    return dayIndex;
}

// Fetch
fetch('weather.json')
.then(getWeatherData)
.then(displayWeatherData)
.catch(error => console.error('Error fetching weather data:', error));

function getWeatherData(response) {
    return response.json();
}

function displayWeatherData(weatherData) {
    const basicDiv = document.getElementById('basic');
    const extraDiv = document.getElementById('extra');
    const otherDatesDiv = document.getElementById('otherDates');

    // Basic og Extra
    const todaysWeather = weatherData[getCurrentDayIndex()];
    
    const imgElement = document.createElement('img');
    imgElement.src = todaysWeather.image + '.png';
    imgElement.alt = todaysWeather.conditions;

    const dayElement = document.createElement('p');
    dayElement.textContent = `Dag: ${todaysWeather.day}`;

    const conditionsElement = document.createElement('h1');
    conditionsElement.textContent = `Vejr: ${todaysWeather.conditions}`;

    basicDiv.innerHTML = '';
    basicDiv.appendChild(imgElement);
    basicDiv.appendChild(conditionsElement);
    basicDiv.appendChild(dayElement);

    const dateElement = document.createElement('p');
    dateElement.textContent = `Dato: ${todaysWeather.date}`;

    const temperatureElement = document.createElement('p');
    temperatureElement.textContent = `Temperatur: Høj ${todaysWeather.temperature.high}°C, Lav ${todaysWeather.temperature.low}°C`;

    const precipitationElement = document.createElement('p');
    precipitationElement.textContent = `Nedbør: ${todaysWeather.precipitation}`;

    extraDiv.innerHTML = '';
    extraDiv.appendChild(dateElement);
    extraDiv.appendChild(temperatureElement);
    extraDiv.appendChild(precipitationElement);

    // Stort Forbukstav
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Vis vejr for alle dage
    weatherData.forEach(dayWeather => {
        const dayDiv = document.getElementById(dayWeather.day);
        if (dayDiv) {
            dayDiv.innerHTML = `
                <img src="${dayWeather.image}.png" alt="${dayWeather.conditions}">
                <h1>${capitalizeFirstLetter(dayWeather.day)}</h1>
                <p>${dayWeather.conditions}</p>
                <p>Temperatur: Høj ${dayWeather.temperature.high}°C, Lav ${dayWeather.temperature.low}°C</p>
                <p>Nedbør: ${dayWeather.precipitation}</p>
            `;
        }
    });
}
