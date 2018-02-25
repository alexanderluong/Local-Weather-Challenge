var lat;
var long;
var city;
var country;
var description;
var id;
var celTemp;
var fahTemp;
var celFlag = true;
var iconMap = {
    "20": "11",
    "21": "11",
    "22": "11",
    "23": "11",
    "30": "09",
    "31": "09",
    "32": "09",
    "50": "10",
    "51": "13",
    "52": "13",
    "53": "13",
    "60": "13",
    "61": "13",
    "62": "13",
    "70": "50",
    "71": "50",
    "72": "50",
    "73": "50",
    "74": "50",
    "75": "50",
    "76": "50",
    "77": "50",
    "78": "50",
    "80": "02",
}
var hours;
var returns;

var CELSIUS_SYMBOL = "°c";
var FAHRENHEIT_SYMBOL = "°f";

$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setCoordinates);
        hours = new Date().getHours();
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
        changeWeatherIcon();
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
        id = json.weather[0].id.toString();
    }

    function changeWeatherIcon() {
        var imageString = "http://openweathermap.org/img/w/";
        var weatherDigits = id.substring(0, 2);
        imageString += iconMap[weatherDigits];
        if (hours >= 6 && hours <= 18) {
            imageString += "d.png";
        } else {
            imageString += "n.png";
        }
        $("#weatherIcon").attr("src", imageString);
        $("#weatherIcon").attr("alt", description);
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