import {
    getRandomCocktails,
    main,
    getRecommendations,
    saveIngredients,
    showModal,
    saveFavoriteCocktail,
    showFavoritesModal
} from "./modules/logic.js";
import { initMap } from "./modules/maps.js";

$(function () {
    // Hide location info
    $(".location").addClass("hide");

    // Renders random cocktails sidebar
    getRandomCocktails();

    // Default search when page loads
    const defaultCocktail = "Bloody Mary";
    main(defaultCocktail);

    // Event handler to get data from search input
    $(".cocktail-search-btn").on("click", () => {
        let userSearch = $(".cocktail-search-frm").val().trim();
        if (userSearch.length === 0) {
            let err = 'No Search Entered';
            let message = 'No search term entered, please enter a cocktail name and try again';
            showModal(err, message);
        } else {
            main(userSearch);
            $(".cocktail-search-frm").val('');
        }

    });



    // Get location Event Handlers
    $("#location-buttons").on("click", (e) => {
        e.stopPropagation();
        if (navigator.geolocation) {
            $(".location").addClass("show");
            location.assign("#local-places");
            $(".find-place").text(e.target.attributes.id.value);
            initMap(e.target.attributes.id.value);
        }
    });

    // Popular Cocktails view event
    $("#popular-cocktails").on("click", (e) => {
        e.stopPropagation();
        main($(e.target).parent()[0].children[0].innerText);
    });

    // Settings
    $("#ingOneOp1").attr("checked", true);
    $("#ingTwoOp2").attr("checked", true);
    $("#settings-form").on("submit", (e) => {
        e.preventDefault();
        let ingOne = $('input[type="radio"][name="ingOneOp"]:checked').val();
        let ingTwo = $('input[type="radio"][name="ingTwoOp"]:checked').val();
        if (ingOne !== ingTwo) {
            saveIngredients(ingOne, ingTwo);

            setTimeout(() => {
                $("#settings").removeClass("show");
            }, 3000);

            $(".toast").toast("show");
            location.reload();
        } else {
            let err = "Same Ingredient Selected";
            let message =
                "Same ingredient selected, you need to choose two different types";
            showModal(err, message);
        }
    });
    // Show settings
    $("#settings-button").on("click", () => {
        $("#settings").addClass("show");
    });

    // Close seting
    $("#close-button").on("click", () => {
        $("#settings").removeClass("show");
    });

    // Render recommended cocktails if prferences found
    if (localStorage.getItem("favorites")) {
        getRecommendations();
        $("#recommendations").addClass("show");
    }



    // Carousel events
    $(".carousel-inner").on("mouseenter", () => {
        $(".recommend-view").addClass("recommended-view");
    });

    $(".carousel-inner").on("click", ".recommend-view", (e) => {
        e.stopPropagation();
        main($(e.target)[0].attributes.value.value);
        location.assign("#description");
    });


    // Handles search if enter key pressed
    $(".cocktail-search-frm").on('keyup', (e) => {

        if (e.keyCode === 13) {


            if ($(e.target).val().trim().length === 0) {

                let err = 'No Search Entered';
                let message = 'No search term entered, please enter a cocktail name and try again';
                showModal(err, message);

            } else {
                main($(e.target).val().trim());
                $(e.target).val('');
            }



        }
    });

    // Add to favorite cocktails

    $('#addFave').on('click', () => {

        let name = $('.cocktail-title').text();
        let image = $('.cocktail-image')[0].currentSrc;
        saveFavoriteCocktail(name, image);
    });

    // Show favorite cocktails
    $('#favoriteCocktils-button').on('click', () => {
        if (localStorage.getItem('favoriteCocktails')) {
            showFavoritesModal();
        } else {
            showModal('Nothing here', 'Nothing yet added');
        }
    });

    // Loads to cocktail details
    $('#favorites-modal-body').on('click', 'button', (e) => {
        main($(e.target).val());
        $('#favoritesModal').modal('hide');
        location.assign('#description');
    });

});



