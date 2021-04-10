document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems);
});
const dayOne = moment().format("YYYY-MM-DD");
const dayTwo = moment().add(1, 'days').format('YYYY-MM-DD');
const dayThree = moment().add(2, 'days').format('YYYY-MM-DD');
const dayFour = moment().add(3, 'days').format('YYYY-MM-DD');
const dayFive = moment().add(4, 'days').format('YYYY-MM-DD');
const daySix = moment().add(5, 'days').format('YYYY-MM-DD');

const fiveDayWeather = document.getElementById('fiveDayWeather');
const displayCityName = document.getElementById('cityName');

let autocomplete;

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('cityInput'), 
        {
            types: ['(cities)'],
            componentRestrictions: {'country': ['US']},
            fields: ['place_id', 'geometry', 'name']
        });
        
        autocomplete.addListener('place_changed', showWeatherData);
};
const currentWeather = async (cityName) => {
    
    const results = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${cityName}&units=imperial&appid=80fbbecd4e1e42900bde6bcfffca49bc`);
        
        const json = await results.json();
        console.log(json);

        let windDirect = windDirection(json.list[0].wind.deg)
        let todaysDate = document.getElementById('todayDate');
        todaysDate.textContent = moment().format("ddd MMMM Do, YYYY HH:mm");
        let tempNow = document.getElementById('temperatureNow');
        tempNow.textContent = `Temperature: ${json.list[0].main.temp} °F`;
        let humidity = document.getElementById('humidity');
        humidity.textContent = `Humidity: ${json.list[0].main.humidity}%`;
        let windSpeed = document.getElementById('windSpeed');
        windSpeed.textContent = `Wind Speed: ${json.list[0].wind.speed} ${windDirect} MPH`
                

        let displayCityWeather = document.createElement('img');
            displayCityWeather.setAttribute('class', 'responsive-img');
            displayCityWeather.setAttribute('id', 'weatherMainIcon');
            displayCityWeather.setAttribute('class', 'weatherIcon');
            displayCityWeather.setAttribute('style', 'margin: 25px;');
            displayCityWeather.src = `https://openweathermap.org/img/wn/${json.list[0].weather[0].icon}@2x.png`;
        let currentI = document.getElementById('currentIcon').append(displayCityWeather)
}
const showWeatherData = async () => {
        let city = autocomplete.getPlace();
        clearData();
        if (!city.geometry) {
            // This if statement is to reset the input back to it's placeholder when the user doesn't select a city.
            document.getElementById('cityInput').placeholder = 'Enter a City';
        } else {
            // Call to Display weather
            getWeatherData(city.name);
        }
        
}

const windDirection = num => {
    if (num > 337.5) return 'N';
    if (num > 292.5) return 'NW';
    if (num > 247.5) return 'W';
    if (num > 202.5) return 'SW';
    if (num > 157.5) return 'S';
    if (num > 122.5) return 'SE';
    if (num > 67.5) return 'E';
    if (num > 22.5){return 'NE';}
    return 'N';
}

const clearData = () => {
    let display = document.getElementById('weatherData');
    let cards = document.querySelectorAll('#weatherDisplay');
    let icon = document.getElementById('weatherMainIcon');
    icon.parentNode.removeChild(icon);
    for (let i = 0; i < cards.length; i++) {
        const element = cards[i];
        display.removeChild(element);
    }
}
async function getWeatherData(cityName) {
    currentWeather(cityName)
    const results = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=80fbbecd4e1e42900bde6bcfffca49bc`);
        
        const json = await results.json();
        
        const weatherCardCollection = document.createElement('div');
            weatherCardCollection.setAttribute('class', 'card');
            weatherCardCollection.setAttribute('id', 'weatherDisplay');

        const weatherCardCollection2 = document.createElement('div');
            weatherCardCollection2.setAttribute('class', 'card');
            weatherCardCollection2.setAttribute('id', 'weatherDisplay');

        const weatherCardCollection3 = document.createElement('div');
            weatherCardCollection3.setAttribute('class', 'card');
            weatherCardCollection3.setAttribute('id', 'weatherDisplay');

        const weatherCardCollection4 = document.createElement('div');
            weatherCardCollection4.setAttribute('class', 'card');
            weatherCardCollection4.setAttribute('id', 'weatherDisplay');

        const weatherCardCollection5 = document.createElement('div');
            weatherCardCollection5.setAttribute('class', 'card');
            weatherCardCollection5.setAttribute('id', 'weatherDisplay');

        const weatherCardCollection6 = document.createElement('div');
            weatherCardCollection6.setAttribute('class', 'card');
            weatherCardCollection6.setAttribute('id', 'weatherDisplay');
        
        const space = document.getElementById('weatherData');

        let windDirect = windDirection(json.list[0].wind.deg)
        let todaysDate = document.getElementById('todayDate');
        todaysDate.textContent = moment().format("ddd MMMM Do, YYYY HH:mm");
        let tempNow = document.getElementById('temperatureNow');
        tempNow.textContent = `Temperature: ${json.list[0].main.temp} °F`;
        let humidity = document.getElementById('humidity');
        humidity.textContent = `Humidity: ${json.list[0].main.humidity}%`;
        let windSpeed = document.getElementById('windSpeed');
        windSpeed.textContent = `Wind Speed: ${json.list[0].wind.speed} ${windDirect} MPH`
        let population = document.getElementById('population');
        population.textContent = `Population: ${json.city.population}`;

        for (let i = 0; i < json.list.length; i++) {

            let timestamp = json.list[i].dt_txt;
            
            let displayCityWeather = document.createElement('img');
                displayCityWeather.setAttribute('class', 'responsive-img');
                displayCityWeather.setAttribute('id', 'weatherIcon'+i);
                displayCityWeather.setAttribute('class', 'weatherIcon');
            let displayCityDate = document.createElement('p');
                displayCityDate.setAttribute('id', 'weatherDate'+i);
            let displayTemperature = document.createElement('p');
                displayTemperature.setAttribute('id', 'temperature'+i);
            let displayWeatherDesc = document.createElement('p');
                displayWeatherDesc.setAttribute('id', 'weatherDesc'+i);
            
            
            let weatherCard = document.createElement('div')
            weatherCard.setAttribute('id', 'weatherBlock'+i);
            weatherCard.setAttribute('class', 'card-content weatherBlock');
            
            displayCityName.textContent = json.city.name;
            
            displayTemperature.textContent = `${json.list[i].main.temp} °F`;
            displayWeatherDesc.textContent = json.list[i].weather[0].description;
            displayCityWeather.src = `https://openweathermap.org/img/wn/${json.list[i].weather[0].icon}@2x.png`;
            displayCityDate.textContent = json.list[i].dt_txt;
            
            
            if (timestamp.includes(dayOne)) {
                weatherCard.append(displayCityWeather, displayCityDate, displayTemperature, displayWeatherDesc)
                weatherCardCollection.append(weatherCard);
            } else if (timestamp.includes(dayTwo)) {
                weatherCard.append(displayCityWeather, displayCityDate, displayTemperature, displayWeatherDesc)
                weatherCardCollection2.append(weatherCard);
            } else if (timestamp.includes(dayThree)) {
                weatherCard.append(displayCityWeather, displayCityDate, displayTemperature, displayWeatherDesc)
                weatherCardCollection3.append(weatherCard);
            } else if (timestamp.includes(dayFour)) {
                weatherCard.append(displayCityWeather, displayCityDate, displayTemperature, displayWeatherDesc)
                weatherCardCollection4.append(weatherCard);
            } else if (timestamp.includes(dayFive)) {
                weatherCard.append(displayCityWeather, displayCityDate, displayTemperature, displayWeatherDesc)
                weatherCardCollection5.append(weatherCard);
            } else if (timestamp.includes(daySix)) {
                weatherCard.append(displayCityWeather, displayCityDate, displayTemperature, displayWeatherDesc)
                weatherCardCollection6.append(weatherCard);
            }
        }
        space.append(weatherCardCollection, weatherCardCollection2, weatherCardCollection3, weatherCardCollection4, weatherCardCollection5, weatherCardCollection6)

};
getWeatherData(displayCityName.textContent);