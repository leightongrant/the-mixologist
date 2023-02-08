// Imports
import { main } from "./logic.js";

$(document).ready(function () {
  const baseIngredients = ['Rum', 'Vodka', 'Gin', 'Tequila', 'Whiskey'];
  const selectBaseIngredient = $('#base-ingredient');
  baseIngredients.forEach(ingredient => {
    selectBaseIngredient.append(`<option value="${ingredient}">${ingredient}</option>`);
  });

  selectBaseIngredient.on('change', function () {
    const selectedIngredient = this.value;
    $.getJSON(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${selectedIngredient}`, function (data) {
      const selectCocktail = $('#cocktails');
      selectCocktail.empty();
      selectCocktail.html(`<option value="" disabled selected>Selcet A Cocktail</option>`);
      data.drinks.forEach(drink => {
        selectCocktail.append(`<option value="${drink.idDrink}">${drink.strDrink}</option>`);
      });
    });
  });

  $('#cocktails').on('change', function () {
    const selectedOption = $(this).find(':selected').text();
    console.log(selectedOption);
    main(selectedOption);
  });

});
