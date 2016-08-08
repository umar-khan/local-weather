$(document).ready(function() {

  // Client Location Information
  // Latitude, Longitude, City, Country Code
  var lat = 0;
  var long = 0;
  var city = "";
  var countryCode = "";

  // Weather Variables
  // tempCel = Temperature in celsius
  // tempFahr = Temperature in fahrenheit
  // weather = Description of weather (eg. Cloudy)
  // weatherCode = 3 digit code defining weather
  // units = Keeps track of units currently being displayed
  var tempCel;
  var tempFahr;
  var weather = "";
  var weatherCode = "";
  var units = "celsius";

  // Mapping of weatherCode to icon classes to pick correct CSS icon
  var icon = {
    // Thunderstorm
    "2": "wi wi-thunderstorm",
    // Drizzle
    "3": "wi wi-sprinkle",
    // Rain
    "5": "wi wi-rain",
    // Snow
    "6": "wi wi-snow",
    // Atmosphere
    "7": "wi wi-fog",
    // Clear
    "800": "wi wi-day-sunny",
    // Clouds
    "8": "wi wi-cloudy",
    // Extreme
    "9": "fa fa-warning",
    // Unknown
    "n/a": "wi wi-na"          
  };
  
  
  // Builds and fires API call to pull weather data based on user's lat and long
  function setWeather() {
    
    // OpenWeatherMap blank metric units call with appid. Defaults to return celsius
    var weatherCall = "http://api.openweathermap.org/data/2.5/weather?lat=latvar&lon=longvar&units=metric&appid=a352e2967ae178b6765ad9e19e8e7eb3";

    // Update weather API call with client lat and long values
    weatherCall = weatherCall.replace(/latvar/gi, lat);
    weatherCall = weatherCall.replace(/longvar/gi, long);

    // Fire OpenWeatherMap API call to get weather
    $.getJSON(weatherCall, function(json) {

      // Set temperature, weather description, and weather code values
      tempCel = Math.round(json["main"]["temp"]);
      weather = json["weather"][0]["main"];
      weatherCode = json["weather"][0]["id"].toString();
      
      //Call function to display weather icon, temperature, and weather description
      displayWeather();

    });

  }

  // Displays appropriate weather icon, temperature, and weather description
  function displayWeather() {
    
    // Find the icon classes in the icon var which match the weathercode returned by the weather API
    if (icon.hasOwnProperty(weatherCode)) {
      $("#mainIcon").addClass(icon[weatherCode]);
    } else if (icon.hasOwnProperty(weatherCode.charAt(0))) {
      $("#mainIcon").addClass(icon[weatherCode.charAt(0)]);
    } else {
      $("#mainIcon").addClass(icon["n/a"]);
    }
    
    // Display temperature and weather description
    $("#temperature").html(tempCel.toString());
    $("#weatherDescription").html(weather);
  }
  
  // Converts temperature celsius <-> fahrenheit and displays results 
  function changeUnits() {
    //Changes current temperature to match desired units
    if (isNaN(tempCel)) {
      // Do nothing if tempCel value is not set
      
    } else if (units == "celsius") {
      // If units are currently celsius, convert to fahrenheit
      tempFahr = Math.round((tempCel*1.8) + 32);
      // Display Fahrenheit value
      $("#temperature").html(tempFahr.toString());
      // Update unit icon
      $("#units").removeClass("wi-celsius");
      $("#units").addClass("wi-fahrenheit");
      // Update units to keep track of current unit
      units = "fahrenheit";
      
    } else if (units == "fahrenheit") {
      // Display Celsius value
      $("#temperature").html(tempCel.toString());
      // Update unit icon
      $("#units").removeClass("wi-fahrenheit");
      $("#units").addClass("wi-celsius");
      // Update units to keep track of current unit
      units = "celsius";
    }
  }


  // Use FreeGeoIP API to collect user location data
  $.getJSON("http://ip-api.com/json", function(json) {

    // Set location variables from JSON results
    lat = json.lat;
    long = json.lon;
    city = json.city;
    countryCode = json.countryCode;
    
    // Show user city and country code
    $("#location").html(city + ", " + countryCode);

    // Call function to find weather data
    setWeather();
  });
  
  
  // Monitors for click event to change temperature units
  $("#units").click(changeUnits);
  
});