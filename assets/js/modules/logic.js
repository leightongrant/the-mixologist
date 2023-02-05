//import { appid1, appid2 } from "./apikeys.js";


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
        .then(data => {
            const responseData = data.drinks[0];
            // To store cocktail data
            const cocktailData = {
                name: '',
                type: '',
                glass: '',
                instructions: '',
                image: '',
                ingredients: [],
            };
            // Build cocktailData object
            cocktailData.name = responseData.strDrink;
            cocktailData.type = responseData.strAlcoholic;
            cocktailData.glass = responseData.strGlass;
            cocktailData.instructions = responseData.strInstructions;
            cocktailData.image = responseData.strDrinkThumb;

            // Loop through response to get list of ingredients            
            for (let i = 1; i < 16; i++) {
                if (responseData[`strIngredient${i}`] === null) {
                    continue;
                } else {
                    cocktailData.ingredients.push(responseData[`strIngredient${i}`]);
                }
            }

            // Render ingredients list
            let ingredientList = '';
            cocktailData.ingredients.forEach(ingredient => {
                ingredientList += `<li>${ingredient}</li>`;
            });
            $('.ingredients').html(ingredientList);

            // Render instructions
            $('.instructions').text(cocktailData.instructions);

            // Render Image
            $('.cocktail-image').attr({ 'src': cocktailData.image, 'alt': cocktailData.name });

            //console.log(cocktailData);
        })
        .catch(err => console.log(err));

};


// This function should query the wikipedia api and get a description of the cocktail
const getCocktailDescription = (search) => {
    const apiURL = `https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&utf8=&format=json&srsearch=${search} cocktail`;
    fetch(apiURL)
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(data => {
            $('.cocktail-title').text(data.query.search[0].title);
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


export { getCocktail, getNavigatorLocation, getCocktailDescription };