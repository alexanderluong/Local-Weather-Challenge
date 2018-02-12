var lat = 0;
var long = 0;

$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setCoordinates);
    }

    function setCoordinates(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        getWeatherFromAPI(setBoxText);
        // setBoxText();
    }

    function setBoxText(json) {
        // $("#weatherBox").html("lat: " + lat + " long:" + long);
        $("#weatherBox").html(json.weather[0].description);
    }

    function getWeatherFromAPI(callback) {
        console.log("fetching the weather...");
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "https://fcc-weather-api.glitch.me/api/current?lon=" + long + "&lat=" + lat,
            success: function(json) {
                console.log(json.weather[0].description);
                console.log(json);
                setBoxText(json);
            },
            failure: function() {
                console.log("Failed to get data.");
            }
        });
    }
});