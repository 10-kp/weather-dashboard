var cities = [];

var citySearch =document.querySelector("#form-City-Search");
var cityInput=document.querySelector("#city");
var weatherContainer=document.querySelector("#current-weather");
var citySearchInput = document.querySelector("#previous-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainer = document.querySelector("#five-day-container");
var pastSearchButton = document.querySelector("#prev-search-buttons");

// To run the program
var formSumbitHandler = function(event){
    event.preventDefault();
    var city = cityInput.value.trim();
    if(city){
        cityWeatherApi(city);
        get5Day(city);
        cities.unshift({city});
        cityInput.value = "";
    } else{
        alert("Please enter a City");
    }
    saveSearch();
    pastSearch(city);
}

var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};

var cityWeatherApi= function(city){
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=844421298d794574c100e3409cee0499"

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

var displayWeather = function(weather, searchCity){
   //clear old content
   weatherContainer.textContent= "";  
   citySearchInput.textContent=searchCity;

   //console.log(weather);

   //create date
   var currentDate = document.createElement("span")
   currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
   citySearchInput.appendChild(currentDate);

   //create temperature data
   var temperatureData = document.createElement("span");
   temperatureData.textContent = "Temperature: " + weather.main.temp + " °F";
   temperatureData.classList = "list-group-item"
  
   //create a span element to hold Humidity data
   var humidityData = document.createElement("span");
   humidityData.textContent = "Humidity: " + weather.main.humidity + " %";
   humidityData.classList = "list-group-item"

   //create a span element to hold Wind data
   var windSpeedData = document.createElement("span");
   windSpeedData.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
   windSpeedData.classList = "list-group-item"

   //append to container
   weatherContainer.appendChild(temperatureData);

   //append to container
   weatherContainer.appendChild(humidityData);

   //append to container
   weatherContainer.appendChild(windSpeedData);

   var lat = weather.coord.lat;
   var lon = weather.coord.lon;
   getUvIndex(lat,lon)
}

var getUvIndex = function(lat,lon){
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayUvIndex(data)
           // console.log(data)
        });
    });
    //console.log(lat);
    //console.log(lon);
}
 
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
    }
    else if(index.value >8){
        uvIndexValue.classList = "severe"
    };

    uvIndexEl.appendChild(uvIndexValue);

    //append index to current weather
    weatherContainer.appendChild(uvIndexEl);
}

var get5Day = function(city){
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
           display5Day(data);
        });
    });
};

var display5Day = function(weather){
    forecastContainer.textContent = ""
    forecastTitle.textContent = "5-Day Forecast:";

    var forecast = weather.list;
        for(var i=5; i < forecast.length; i=i+8){
       var dailyForecast = forecast[i];
        
       
       var forecastEl=document.createElement("div");
       forecastEl.classList = "card bg-primary text-light m-2";

       //console.log(dailyForecast)

       //create date element
       var forecastDate = document.createElement("h5")
       forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header text-center"
       forecastEl.appendChild(forecastDate);

       
       //create an image element
       var weatherIcon = document.createElement("img")
       weatherIcon.classList = "card-body text-center";
       weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  

       //append to forecast card
       forecastEl.appendChild(weatherIcon);
       
       //create temperature span
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
        forecastContainer.appendChild(forecastEl);
    }

}

var pastSearch = function(pastSearch){
 
    // console.log(pastSearch)

    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
    pastSearchEl.setAttribute("data-city",pastSearch)
    pastSearchEl.setAttribute("type", "submit");

    pastSearchButton.prepend(pastSearchEl);
}


var pastSearchHandler = function(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        cityWeatherApi(city);
        get5Day(city);
    }
}


citySearch.addEventListener("submit", formSumbitHandler);
pastSearchButton.addEventListener("click", pastSearchHandler);