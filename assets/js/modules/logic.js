
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

// This function displays a modal
const showModal = (errMsg, mainMessage) => {
    $('#modal-title').text(errMsg);
    $('#modal-body').text(mainMessage);
    $('#errorModal').modal("show");
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
            $('.cocktail-description').html(data.query.search[0].snippet);

        })
        .catch(err => err);


};



// Main function 
const main = (search) => {
    getCocktail(search);
    getCocktailDescription(search);

};









export { getRandomCocktails, getCocktailDescription, getCocktail, main };