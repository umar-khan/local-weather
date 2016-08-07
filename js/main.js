$(document).ready(function() {

  // Client Location Information
  var lat = 0;
  var long = 0;
  var city = "";
  var countryCode = "";

  // Weather Variables
  var tempCel;
  var weather = "";
  var weatherCode = "";

  // Mapping of weather codes to icon classes
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
  
  
  function setWeather() {
    // OpenWeatherMap blank metric units call with appid. Defaults to return celcius
    var weatherCall = "http://api.openweathermap.org/data/2.5/weather?lat=latvar&lon=longvar&units=metric&appid=a352e2967ae178b6765ad9e19e8e7eb3";

    // Update weather API call with client lat and long values
    weatherCall = weatherCall.replace(/latvar/gi, lat);
    weatherCall = weatherCall.replace(/longvar/gi, long);

    // Fire OpenWeatherMap API call to get weather
    $.getJSON(weatherCall, function(json) {

      // Set temperature variables
      tempCel = Math.round(json["main"]["temp"]);
      weather = json["weather"][0]["main"];
      weatherCode = json["weather"][0]["id"].toString();

      var text = JSON.stringify(json);
      $("#weatherapi").html(text);
      $("#weatherinfo").html(weatherCode.toString());
      
      //Call function to display correct weather icon
      displayWeather();

    });

  }


  function displayWeather() {
    
    // Find the icon classes in the icon var which match the weathercode returned by the weather API
    if (icon.hasOwnProperty(weatherCode)) {
      $("#mainIcon").addClass(icon[weatherCode]);
    } else if (icon.hasOwnProperty(weatherCode.charAt(0))) {
      $("#mainIcon").addClass(icon[weatherCode.charAt(0)]);
    } else {
      $("#mainIcon").addClass(icon["n/a"]);
    }
    
    $("#temperature").html(tempCel.toString());
  }


  // Use FreeGeoIP API to collect user location data
  $.getJSON("http://freegeoip.net/json/", function(json) {

    // Set location variables from JSON results
    lat = json.latitude;
    long = json.longitude;
    city = json.city;
    countryCode = json.country_code;
    
    // Print out results to screen
    var text = JSON.stringify(json);
    $("#firstcall").html(text);
    $("#vars").html(lat + "," + long + "," + city + "," + countryCode);
    console.log(lat);


    setWeather();


  });





});