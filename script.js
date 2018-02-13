var lat;
var long;
var city;
var country;
var description;
var celTemp;
var fahTemp;

var CELSIUS_SYMBOL = "°c";
var FAHRENHEIT_SYMBOL = "°f";

$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setCoordinates);
        $("#unitBtn").on("click", function() {

        });
    }

    function setCoordinates(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        getWeatherFromAPI(setWeatherText);
    }

    function setWeatherText(json) {
        addParagraphTags();
        $("#locationText").html(city + ", " + country);
        $("#descriptionText").html(description);
        $("#tempText").html(celTemp + " °c<br>");
    }

    function celsiusToFahrenheit(celsius) {
        if (typeof celsius === 'number') {
            return (1.8 * celsius + 32).toFixed(2);
        }
    }

    function addParagraphTags() {
        $("#descriptionDiv").html("<p id=\"descriptionText\"></p>");
        $("#tempDiv").html("<p id=\"tempText\"></p>");
    }

    function getWeatherFromAPI(callback) {
        console.log("fetching the weather...");
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "https://fcc-weather-api.glitch.me/api/current?lon=" + long + "&lat=" + lat,
            success: function(json) {
                celTemp = json.main.temp;
                fahTemp = celsiusToFahrenheit(celTemp);
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