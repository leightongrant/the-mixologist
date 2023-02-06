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
            location.assign('#local-places');
            $('.find-place').text(e.target.attributes.id.value);
            initMap(e.target.attributes.id.value);
        }
    });

    // Popular Cocktails view event
    $('#popular-cocktails').on('click', (e) => {
        e.stopPropagation();
        main($(e.target).parent()[0].children[0].innerText);
    });



    // Renders random cocktails sidebar
    getRandomCocktails();





});



































