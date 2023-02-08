import { getRandomCocktails, main, getRecommendations, saveIngredients } from "./modules/logic.js";


$(function () {
    //TODO: Change default behavior of wether to show or hide maps on page load
    // Hide location info
    $('.location').addClass('hide');



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


    // Settings
    $('#ingOneOp1').attr('checked', true);
    $('#ingTwoOp1').attr('checked', true);
    $('#settings-form').on('submit', (e) => {
        e.preventDefault();
        let ingOne = $('input[type="radio"][name="ingOneOp"]:checked').val();
        let ingTwo = $('input[type="radio"][name="ingTwoOp"]:checked').val();
        saveIngredients(ingOne, ingTwo);
        $('#settings').addClass('hide');
    });

    $('#settings-button').on('click', () => {
        $('#settings').addClass('show');
    });

    // Recommended cocktails
    getRecommendations();




    // Renders random cocktails sidebar
    getRandomCocktails();


});



































