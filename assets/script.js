var cities = [];
var citySearchEl =document.querySelector("#form-city-search");
var cityInputEl=document.querySelector("#city");
var weatherContainerEl=document.querySelector("#current-weather");
var citySearchInputEl = document.querySelector("#previous-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#five-day-container");
var pastSearchButtonEl = document.querySelector("#prev-search-buttons");

// To run the program
// add elements to the begining of the array
var formSumbitHandler = function(event){
    event.preventDefault();
    var city = cityInputEl.value;
    if(city){
        cityWeatherApi(city);
        fiveDayForecast(city);
        cities.unshift({city});
        cityInputEl.value = "";
    } 
    saveSearch();
    pastSearch(city);
}
//Local storage
var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};
//Create an API key & link to the url
var cityWeatherApi= function(city){
    var apiKey = "3c08c223f7924790dbebee106b70e779"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};
// variables to display city, date, temp, humidity, wind
var displayWeather = function(weather, searchCity){
   weatherContainerEl.textContent= "";  
   citySearchInputEl.textContent=searchCity;

   // date variable
   var currentDate = document.createElement("span")
   
   //receving time
   currentDate.textContent= ": " + moment().format("MMM D, YYYY");
   citySearchInputEl.appendChild(currentDate);
   
   // temperature data
   var temperatureData = document.createElement("span");
   temperatureData.textContent = "Temperature: " + weather.main.temp + " °F";
   temperatureData.classList = "list-group-item"
   
   // Humidity data
   var humidityData = document.createElement("span");
   humidityData.textContent = "Humidity: " + weather.main.humidity + " %";
   humidityData.classList = "list-group-item"
   
   //Wind data
   var windSpeedData = document.createElement("span");
   windSpeedData.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
   windSpeedData.classList = "list-group-item"
   
   //add the child element to the container
   weatherContainerEl.appendChild(temperatureData);
   weatherContainerEl.appendChild(humidityData);
   weatherContainerEl.appendChild(windSpeedData);
   
   var lat = weather.coord.lat;
   var lon = weather.coord.lon;
   getUvIndex(lat,lon)
}
//Get the UV data
var getUvIndex = function(lat,lon){
    var apiKey = "3c08c223f7924790dbebee106b70e779"
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
  
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayUvIndex(data);
        });
    });
}
 //run the UV data
var displayUvIndex = function(index){
    var uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group-item"
    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value
  
    if(index.value <=2){
        uvIndexValue.classList = "favorable"
    }else if(index.value >2 && index.value<=8){
        uvIndexValue.classList = "moderate "
    }else if(index.value >8){
        uvIndexValue.classList = "severe"
    };
    
    uvIndexEl.appendChild(uvIndexValue);
    //append UV to weather
    weatherContainerEl.appendChild(uvIndexEl);
}
//5-day forecast API
var fiveDayForecast = function(city){
    var apiKey = "3c08c223f7924790dbebee106b70e779"
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
    
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayFiveDay(data);
        });
    });
};

//5-day forecast variable
var displayFiveDay = function(weather){
    forecastContainerEl.textContent = " "
    forecastTitle.textContent = "Five-Day Forecast:";

    //5 -day loop
    var forecast = weather.list;
        for(var i=5; i < forecast.length; i = i+8){
       var dailyForecast = forecast[i];
       var forecastEl=document.createElement("div");
       forecastEl.classList = "card bg-primary text-light m-1";
       
       // date and append to docoument 
       //create a timestamp
       var forecastDate = document.createElement("h3")
       forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header text-center"
       forecastEl.appendChild(forecastDate);
       
       //append forecast card
       var weatherIcon = document.createElement("img");
       weatherIcon.setAttribute("src", "http://openweathermap.org/img/w/" + dailyForecast.weather[0].icon + ".png");
       forecastEl.appendChild(weatherIcon);
       
       //create temperature span 
       //CSS link
       var forecastTempEl=document.createElement("span");
       forecastTempEl.classList = "card-body text-center";
       forecastTempEl.textContent = dailyForecast.main.temp + " °F";
       
       //append to forecast card
        forecastEl.appendChild(forecastTempEl);
       var forecastHumEl=document.createElement("span");
       forecastHumEl.classList = "card-body text-center";
       forecastHumEl.textContent = dailyForecast.main.humidity + "  %";
       
       //append to forecast card
       forecastEl.appendChild(forecastHumEl);
       
       // console.log(forecastEl);
       //append to five day container
        forecastContainerEl.appendChild(forecastEl);
    }
}
// console log past searches
var pastSearch = function(pastSearch){
    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
    pastSearchEl.setAttribute("data-city",pastSearch)
    pastSearchEl.setAttribute("type", "submit");
    pastSearchButtonEl.prepend(pastSearchEl);
}

var pastSearchHandler = function(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        cityWeatherApi(city);
        fiveDayForecast(city);
    }
}
citySearchEl.addEventListener("submit", formSumbitHandler);
pastSearchButtonEl.addEventListener("click", pastSearchHandler);