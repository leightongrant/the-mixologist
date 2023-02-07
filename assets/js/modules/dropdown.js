// Imports
import { main } from "./logic.js";

$(document).ready(function () {
  const baseIngredients = ['rum', 'vodka', 'gin', 'tequila', 'whiskey'];
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

  $('#cocktails').on('change', function() {
    const selectedOption = $(this).find(':selected').text();
    $(".cocktail-search-frm").val(selectedOption);
    getCocktailDescription(selectedOption);
  });
  
  
  function getCocktailDescription(selectedOptionValue) {
    $.getJSON(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${selectedOptionValue}`, function(data) {
      const cocktail = data.drinks[0];
      const ingredients = [];
      for (let i = 1; i <= 15; i++) {
        if (cocktail[`strIngredient${i}`]) {
          ingredients.push(`${cocktail[`strMeasure${i}`]} ${cocktail[`strIngredient${i}`]}`);
        }
      }
      const instructions = cocktail.strInstructions;
      $('.ingredients').html(ingredients.map(ingredient => `<li>${ingredient}</li>`).join(''));
      $('.instructions').text(instructions);

      $('.cocktail-search-frm').val(selectedOptionValue);
      $('.cocktail-search-btn').submit();
    });
  }
  
});

