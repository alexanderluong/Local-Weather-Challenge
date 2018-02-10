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
	}

	function setBoxText() {
		$("#weatherBox").html("lat: " + lat + " long:" + long);
	}
});