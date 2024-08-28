const data = fetch('weather.json')
.then(getWeatherData)

function getWeatherData(response){
    console.log(response)
}

