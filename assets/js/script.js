
import { getRandomCocktails, main, getRecommendations, saveIngredients } from "./modules/logic.js";
import { initMap } from "./modules/maps.js";


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

        setTimeout(() => { $('#settings').removeClass('show'); }, 3000);

        $('.toast').toast('show');

    });
    // Show settings
    $('#settings-button').on('click', () => {
        $('#settings').addClass('show');
    });


    // Render recommended cocktails if prferences found
    if (localStorage.getItem('favorites')) {
        getRecommendations();
        $('#recommendations').addClass('show');

    }


    // Renders random cocktails sidebar
    getRandomCocktails();



    $('.carousel-inner').on('mouseenter', () => {
        $('.recommend-view').addClass('recommended-view');
    });

    $('.carousel-inner').on('click', '.recommend-view', (e) => {
        e.stopPropagation();
        main($(e.target)[0].attributes.value.value);
        location.assign('#description');

    });







});



































