var searchForm  = document.getElementById("search-form");
function handleSearchSubmit(event){
    event.preventDefault();
    var searchInputVal = document.querySelector("#search-text-input").value;
    // var formatSelectVal = document.querySelector("#format-input").value;
    if (!searchInputVal) {
        alert("Please input city");
        return
    }

    document.location.replace("./search-result.html?q="+searchInputVal+"&format="+formatSelectVal)
    
}
searchForm.addEventListener("submit", handleSearchSubmit);