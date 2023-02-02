import { getCocktailDescription, getNavigatorLocation } from "./modules/logic.js";

$(function () {

    if (navigator.geolocation) {
        getNavigatorLocation();
    }


    getCocktailDescription('margarita');











































});