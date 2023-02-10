
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

            // Loop through response to get list of ingredients & measures            
            for (let i = 1; i < 16; i++) {
                if (responseData[`strMeasure${i}`] === null || responseData[`strIngredient${i}`] === null) {
                    continue;
                } else {
                    cocktailData.ingredients.push(responseData[`strMeasure${i}`] + ' - ' + responseData[`strIngredient${i}`]);
                }
            }

            // Render ingredients list
            let ingredientList = '';
            cocktailData.ingredients.forEach(ingredient => {
                ingredientList += `<li>${ingredient}</li>`;
            });
            $('.ingredients').html(ingredientList);

            // Render cocktail type
            $('.cocktail-type').text(cocktailData.type);

            // Render instructions
            $('.instructions').text(cocktailData.instructions);

            // Render Image
            $('.cocktail-image').attr({ 'src': cocktailData.image, 'alt': cocktailData.name });

            // Render Cocktail title
            $('.cocktail-title').text(cocktailData.name);
        })
        .catch(err => {
            const errMsg = 'Cocktail Not Found';
            const mainMessage = 'The Cocktail you are looking for is not found. Please check your spelling and try again.';
            showModal(errMsg, mainMessage);
        });

};

// This function displays a error modal
const showModal = (errMsg, mainMessage) => {
    $('#modal-title').text(errMsg);
    $('#modal-body').text(mainMessage);
    $('#errorModal').modal("show");
};

const showFavoritesModal = () => {
    let favorites = JSON.parse(localStorage.getItem('favoriteCocktails'));
    $('#favorites-modal-body').empty();
    favorites.forEach((favorite) => {

        let favoriteItems = '';
        favoriteItems += `<div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${favorite.image}"
                    alt="Trendy Pants and Shoes" class="img-fluid rounded-start" style="height: auto;object-fit: cover;"/>
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${favorite.name}</h5>
                    <p class="card-text">
                        This is a wider 
                    </p>
                    <button type="button" class="btn btn-secondary btn-sm">View Ingredients</button>
                </div>
            </div>
        </div>
    </div>`;

        $('#favorites-modal-body').append(favoriteItems);


    });





    $('#favoritesModal').modal('show');

};

// This function get a list of random cocktails
const getRandomCocktails = () => {
    let lttr = String.fromCharCode(Math.floor(65 + Math.random() * 25));
    //lttr = 'u';
    const apiURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${lttr}`;
    fetch(apiURL)
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(data => {
            let elements = '';
            for (let i = 0; i < data.drinks.length; i++) {
                let responseData = data.drinks[i];
                if (i === 4) return;

                elements += `<div class="col-12 bg bg-light rounded border border-1 my-3 py-3"><div class="">
                    <h5 class="pop-title">${responseData.strDrink}</h5>
                    <img src="${responseData.strDrinkThumb}"
                        alt="" srcset="" class="w-100 img-fluid rounded pop-image" loading="lazy">
                    <p class="pop-type badge rounded-pill text-bg-info my-3">${responseData.strAlcoholic}</p><br>
                    <button type="button" class="btn btn-outline-secondary btn-sm">View</button>
                </div></div>`;

                $('#popular-cocktails').html(elements);
            }
        })
        .catch((err) => {
            getRandomCocktails();
        });
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
            let snippet = data.query.search[0].snippet;
            if (snippet.toLowerCase().includes("cocktail")) {
                $('.cocktail-description').html(snippet);
            } else {
                $('.cocktail-description').html(" A cocktail is an alcoholic/non-alcoholic drink consisting of a spirit or spirits mixed with other ingredients, such as fruit juice or cream.");
            }
        })
        .catch(err => err);
};

// Function to recommend cocktails based on user preferences
const getRecommendations = () => {

    // Check Local Storage
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    let ingSel = [favorites.ingOne, favorites.ingTwo][Math.floor(Math.random() * 2)];

    if (favorites !== null) {
        getCocktailByIngredient(ingSel);

    }
};

// Function get ingredients and check user favorites
const getCocktailIngredients = (search, recs) => {
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
                ingredients: [],
                image: '',
                name: '',
            };

            cocktailData.image = responseData.strDrinkThumb;
            cocktailData.name = responseData.strDrink;

            // Loop through response to get list of ingredients            
            for (let i = 1; i < 16; i++) {
                if (responseData[`strIngredient${i}`] === null) {
                    continue;
                } else {
                    cocktailData.ingredients.push(responseData[`strIngredient${i}`]);
                }
            }
            //TODO: If no cocktails found based on two favorites, feedback info or recommend some with either
            let favorites = JSON.parse(localStorage.getItem('favorites'));
            if (cocktailData.ingredients.includes(favorites.ingOne) && cocktailData.ingredients.includes(favorites.ingTwo)) {
                recs.push(cocktailData);
                let active = 'active';
                recs.length - 1 === 0 ? active = 'active' : active = '';


                let carouselSlides = `<div class="carousel-item ${active}">
                <img src="${cocktailData.image}" class="d-block w-100"
                    alt="${cocktailData.name}" style="height: 70vh; object-fit: cover">
                <div class="carousel-caption">
                    <h3 class="text-light">${cocktailData.name}</h3>
                    <span class="recommend-view"><u value="${cocktailData.name}">View Recipe</u></span>
                </div>
            </div>`;
                $('.carousel-inner').append(carouselSlides);
            } else if (cocktailData.ingredients.includes(favorites.ingOne) || cocktailData.ingredients.includes(favorites.ingTwo)) {
                recs.push(cocktailData);
                let active = 'active';
                recs.length - 1 === 0 ? active = 'active' : active = '';


                let carouselSlides = `<div class="carousel-item ${active}">
                <img src="${cocktailData.image}" class="d-block w-100"
                    alt="${cocktailData.name}" style="height: 70vh; object-fit: cover">
                <div class="carousel-caption">
                    <h3 class="text-light">${cocktailData.name}</h3>
                    <span class="recommend-view"><u value="${cocktailData.name}">View Recipe</u></span>
                </div>
            </div>`;
                $('.carousel-inner').append(carouselSlides);

            }

        })
        .catch(err => {
            err;
            // const errMsg = 'Cocktail Not Found';
            // const mainMessage = 'The Cocktail you are looking for is not found. Please check your spelling and try again.';
            // showModal(errMsg, mainMessage);
        });

};


// Get a cocktail by ingredient
const getCocktailByIngredient = (ing) => {
    $.getJSON(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`, function (data) {
        let recs = [];
        data.drinks.forEach((drink) => {
            getCocktailIngredients(drink.strDrink, recs);
        });
    });
};

// Function to save favorite ingredient
const saveIngredients = (ingOne, ingTwo) => {
    localStorage.setItem('favorites', JSON.stringify({
        ingOne: ingOne,
        ingTwo: ingTwo
    }));
};

// Function to save favorite cocktail
const saveFavoriteCocktail = (name, image) => {
    let items = {
        name: name,
        image: image
    };

    let itemsArr = JSON.parse(localStorage.getItem('favoriteCocktails'));

    if (itemsArr === null) {
        itemsArr = [];
        itemsArr.push(items);
    } else {
        itemsArr.forEach((i) => {
            if (name === i.name) {
                let err = 'Item already added';
                let message = 'This cocktail has already been added to your favorites';
                showModal(err, message);
            } else {
                itemsArr.push(items);
            }
        });
    };

    localStorage.setItem('favoriteCocktails', JSON.stringify(itemsArr));
};

// Main function 
const main = (search) => {
    getCocktail(search);
    getCocktailDescription(search);

};

export { getRandomCocktails, main, getRecommendations, saveIngredients, showModal, saveFavoriteCocktail, showFavoritesModal };