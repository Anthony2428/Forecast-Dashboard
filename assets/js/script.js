document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems);
});

const fiveDayWeather = document.getElementById('fiveDayWeather');
const displayCityName = document.getElementById('cityName');
const cityNameInput = document.querySelector('#cityInput');

// Variable to hold the locations
let dataArr = {};
// Load the locations once, on page-load.
$(function() { 
    $.getJSON("../city.list.json").done(function(data) {
        window.dataArr = data.pages;
    }).fail(function(data) {
        console.log('no results found');
        window.dataArr = testData; // remove this line in non-demo mode
    });
});
// Respond to any input change, and show first few matches
cityNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let cityInput = cityNameInput.val().toLowerCase();
        $('#matches').text(!cityInput.length ? '' : 
            dataArr.filter(function(city) {
                // look for the entry with a matching `code` value
                return (city.name.toLowerCase().indexOf(cityInput) !== -1);
            }).map(function(city) {
                // get titles of matches
                return city.name;
            }).join('\n')); // create one text with a line per matched title
    }
});
$("#search").on('keypress keyup change input', function() { 
    
});
// submit button is not needed really


const getWeatherData = async (cityName) => {
    const results = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=80fbbecd4e1e42900bde6bcfffca49bc`);
    
	const json = await results.json();
    console.log(json)
}
getWeatherData('New York')

class cityData {
    constructor(cityName, weatherDesc, temp, tempFeelsLike, longitude, latitude) {
        this.cityName = cityName;
        this.currentWeather = weatherDesc;
        this.temperature = temp;
        this.feelsLike = tempFeelsLike;
        this.cityLon = longitude;
        this.cityLat = latitude;
    }
}



