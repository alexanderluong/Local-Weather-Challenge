var lat = 0;
var long = 0;
var temp;

var CELCIUS_SYMBOL = "°c";
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
        $("#weatherBox").html(json.name.toLowerCase() + ", " + json.sys.country.toLowerCase() + "<br>" +
            json.weather[0].description + "<br>" +
            +json.main.temp + " °c<br>");
    }

    function celciusToFahrenheit(celcius) {
        if (typeof celcius === 'number') {
            return 1.8 * celcius + 32;
        }
    }

    function getWeatherFromAPI(callback) {
        console.log("fetching the weather...");
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "https://fcc-weather-api.glitch.me/api/current?lon=" + long + "&lat=" + lat,
            success: function(json) {
                callback(json);
            },
            failure: function() {
                console.log("Failed to get data.");
            }
        });
    }
});