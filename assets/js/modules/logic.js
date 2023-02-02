import { appid1, appid2 } from "./apikeys.js";


// This function should query the cocktaiĺ data base and create an object with
// all required data
const getCocktail = (search) => {
    const apiURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
    fetch(apiURL)
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));

};


// This function should query the wikipedia api and get a description of the cocktail
const getCocktailDescription = (search) => {
    const apiURL = `https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&utf8=&format=json&srsearch=${search}`;
    fetch(apiURL)
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(data => {
            $('.cocktail-description').text(data.query.search[0].title);
            $('.cocktail-description').html(data.query.search[0].snippet);
            //console.log(data.query.search[0].title);
            //console.log(data.query.search[0].snippet);
        })
        .catch(err => console.log(err));

};


// This function should request a location from the browser
const getNavigatorLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        console.log(lat, lon);

    }, err => {
        console.log(err);
    });

};



// This function should query openweathermap api for a city name to get lat and lon data
const getLocation = (city, appid) => {
    const apiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=5&appid=${appid}`;
    fetch(apiURL)
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));

};

// This function should query the local business api and create an object with required data
const getLocalBars = (search) => {
    const apiURL = `https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&utf8=&format=json&srsearch=${search}`;
    fetch(apiURL)
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));

};







export { getNavigatorLocation, getCocktailDescription };