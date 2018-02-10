var lat = 0;
var long = 0;

$(document).ready(function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(setCoordinates);
	}

	function setCoordinates(position) {
		lat = position.coords.latitude;
		long = position.coords.longitude;
		setBoxText();
		getWeatherFromAPI();
	}

	function setBoxText() {
		$("#weatherBox").html("lat: " + lat + " long:" + long);
	}

	function getWeatherFromAPI() {
		console.log("fetching the weather...");
		$.ajax({
			type: "GET",
			dataType: "json",
			url: "https://fcc-weather-api.glitch.me/api/current?lon="+long+"&lat="+lat,
			success: function(json) {
				console.log(json.weather[0].description);
			},
			failure: function() {
				console.log("Failed to get data.");
			}
		});
	}
});