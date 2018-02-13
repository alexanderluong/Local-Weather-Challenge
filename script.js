var lat;
var long;
var city;
var country;
var description;
var temp;

var CELSIUS_SYMBOL = "°c";
var FAHRENHEIT_SYMBOL = "°f";

$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setCoordinates);
    }

    function setCoordinates(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        getWeatherFromAPI(setBoxText);
    }

    function setBoxText(json) {
        $("#weatherBox").html(city + ", " + country + "<br>" +
            description + "<br>" +
            +temp + " °c<br>");
    }

    function celsiusToFahrenheit(celcius) {
        if (typeof celcius === 'number') {
            return (1.8 * celcius + 32).toFixed(2);
        }
    }

    function fahrenheitToCesius(fahrenheit) {
        if (typeof fahrenheit === 'number') {
            return ((fahrenheit - 32) * 5 / 9).toFixed(2);
        }
    }

    function getWeatherFromAPI(callback) {
        console.log("fetching the weather...");
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "https://fcc-weather-api.glitch.me/api/current?lon=" + long + "&lat=" + lat,
            success: function(json) {
                temp = json.main.temp;
                city = json.name.toLowerCase();
                country = json.sys.country.toLowerCase();
                description = json.weather[0].description;
                callback(json);
            },
            failure: function() {
                console.log("Failed to get data.");
            }
        });
    }
});