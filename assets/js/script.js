import { getCocktail, getCocktailDescription, getNavigatorLocation } from "./modules/logic.js";

$(function () {

    // if (navigator.geolocation) {
    //     getNavigatorLocation();
    // }
    const main = (search) => {
        getCocktail(search);
        getCocktailDescription(search);

    };


    main('bloody mary');














































});