import { getAllCocktails } from "./modules/carousel.js";
import { getCocktail, getCocktailDescription, getNavigatorLocation } from "./modules/logic.js";


$(function () {
    // Main function 
    const main = (search) => {
        getCocktail(search);
        getCocktailDescription(search);

    };

    let randomCocktail = 'bloody mary';
    main(randomCocktail);


    // Event handler to get data from search and call main
    $('.cocktail-search-btn').on('click', () => {
        let userSearch = $('.cocktail-search-frm').val();

        main(userSearch);
    });






    // if (navigator.geolocation) {
    //     getNavigatorLocation();
    // }

});

getAllCocktails();