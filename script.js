var lat;
var long;
var city;
var country;
var description;
var celTemp;
var fahTemp;
var celFlag = true;
var iconMap = {
    "clear sky": "01",
    "few clouds": "02",
    "scattered clouds": "03",
    "broken clouds": "04",
    "shower rain": "09",
    "rain": "10",
    "thunderstorm": "11",
    "snow": "13",
    "mist": "50"
}

var CELSIUS_SYMBOL = "°c";
var FAHRENHEIT_SYMBOL = "°f";

$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setCoordinates);
        $("#unitBtn").on("click", setUpChangeUnitBtn);
    }

    function setCoordinates(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        getWeatherFromAPI(setWeatherText);
    }

    // Adds the weather text to the HTML file.
    function setWeatherText(json) {
        addParagraphTags();
        $("#locationText").html(city + ", " + country);
        $("#descriptionText").html(description);
        $("#tempText").html(celTemp + " " + CELSIUS_SYMBOL + "<br>");
    }

    // Converts celcius to Fahrenheit and returns it.
    function celsiusToFahrenheit(celsius) {
        if (typeof celsius === 'number') {
            return (1.8 * celsius + 32).toFixed(2);
        }
    }

    // Adds empty paragraphs to HTML file for modification.
    function addParagraphTags() {
        $("#descriptionDiv").html("<p id=\"descriptionText\"></p>");
        $("#tempDiv").html("<p id=\"tempText\"></p>");
    }

    // Add event listener to change unit button. Changes tempText from Celsius to Fahrenheit.
    function setUpChangeUnitBtn() {
        if (celFlag == true) {
            $("#tempText").html(fahTemp + " " + FAHRENHEIT_SYMBOL + "<br>");
            celFlag = false;
        } else {
            $("#tempText").html(celTemp + " " + CELSIUS_SYMBOL + "<br>");
            celFlag = true;
        }
    }

    // Initializes global variables
    function setVariables(json) {
        celTemp = json.main.temp;
        fahTemp = celsiusToFahrenheit(celTemp);
        city = json.name.toLowerCase();
        country = json.sys.country.toLowerCase();
        description = json.weather[0].description;
        total = json;
    }

    function changeWeatherIcon(description) {

    }

    function getWeatherFromAPI(callback) {
        console.log("fetching the weather...");
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "https://fcc-weather-api.glitch.me/api/current?lon=" + long + "&lat=" + lat,
            success: function(json) {
                setVariables(json);
                callback(json);
            },
            failure: function() {
                console.log("Failed to get data.");
            }
        });
    }
});