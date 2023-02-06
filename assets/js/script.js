import { getCocktail, getCocktailDescription, getRandomCocktails } from "./modules/logic.js";




$(function () {

    // Hide location info
    $('.location').addClass('hide');

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

    // Get location Event Handlers    
    $('#location-buttons').on('click', (e) => {
        e.stopPropagation();
        if (navigator.geolocation) {
            $('.location').addClass('show');
            location.assign('#google-map');
            initMap(e.target.attributes.id.value);
        }
    });



    // Renders random cocktails sidebar
    getRandomCocktails();





});



































