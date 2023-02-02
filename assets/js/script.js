import { getCocktail, getCocktailDescription, getNavigatorLocation } from "./modules/logic.js";
import { getLocation } from "./modules/googlemaps.js";

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


// $('#myMapModal').on('show.bs.modal', function() {
//     console.log("in function")
//     getLocation();
//     //google.maps.event.trigger(map, 'resize');
//  })
































