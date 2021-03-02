# weather-dashboard

Link:

Git Hub Link: 

Snapshot

Steps:
1. home page
----Put HTML element on the page ----
<form> - collect user input
<input> type = submit
<select> create a drop down
<option>drop down list</option>
</select>
<button> for search
</form>

2. Javascript for home page
---event listener on button click,
---callback fucnction
---get the values from the input and select
---direct users to new page - document.location.replace("./search-result.html?search=" + inputVal + "&format=" +  "selectCalue)

3. Create search-result.html
---copy the html from home page
---create container that will hold results
---attah your js file

4. search.js
--- we document.location.search - to get query parameters
--   var searchParamsArr = document.location.search.split('&');
  // Get the query and format values
  var query = searchParamsArr[0].split('=').pop();
  var format = searchParamsArr[1].split('=').pop();

---fetch("https://www.loc.gov/") attach the seach and format
-- we will get our data // console.log the data
---for loop to create rows

---for the form
create addEventListener 
gather the data from input and select again
on button click, you will fetch again 


AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```
