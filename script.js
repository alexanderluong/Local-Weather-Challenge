$(document).ready(function() {
  getLocation();
  
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        // TODO: add something to do for the output
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
});