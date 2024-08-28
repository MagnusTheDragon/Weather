
// Kode til at se hvilken dag det er og omregne det til tal så jeg kan bruge det i vejrappen
function getCurrentDayIndex() {
    const daysOfWeek = 
    ["mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag", "søndag"];
    const today = new Date();
    let dayIndex = today.getDay();
    dayIndex = (dayIndex + 6) % 7;
    return dayIndex;
}

// Vejr Appen
fetch('weather.json')
.then(getWeatherData)
.then(displayWeatherData)
function getWeatherData(response) {
    return response.json();
}

function displayWeatherData(weatherData) {
    // const todaysWeather = weatherData[getCurrentDayIndex()];
    const todaysWeather = weatherData[2];
    const basicDiv = document.getElementById('basic');
    const extraDiv = document.getElementById('extra');

    // Basic
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

    // Extra
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
}



