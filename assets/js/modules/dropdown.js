$(document).ready(function() {
  const baseIngredients = ['rum', 'vodka', 'gin', 'tequila', 'whiskey'];
  const selectBaseIngredient = $('#base-ingredient');
  baseIngredients.forEach(ingredient => {
    selectBaseIngredient.append(`<option value="${ingredient}">${ingredient}</option>`);
  });

  selectBaseIngredient.on('change', function() {
    const selectedIngredient = this.value;
    $.getJSON(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${selectedIngredient}`, function(data) {
      const selectCocktail = $('#cocktails');
      selectCocktail.empty();
      data.drinks.forEach(drink => {
        selectCocktail.append(`<option value="${drink.idDrink}">${drink.strDrink}</option>`);
      });
    });
  });

  $('#cocktails').on('change', function() {
    const selectedOption = $(this).find(':selected').text();
    getCocktailDescription(selectedOption);
  });

  function getCocktailDescription(selectedOption) {
    $.getJSON(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${selectedOption}`, function(data) {
      const cocktail = data.drinks[0];
      const ingredients = [];
      for (let i = 1; i <= 15; i++) {
        if (cocktail[`strIngredient${i}`]) {
          ingredients.push(`${cocktail[`strMeasure${i}`]} ${cocktail[`strIngredient${i}`]}`);
        }
      }
      const instructions = cocktail.strInstructions;
      const imageURL = cocktail.strDrinkThumb;
      $('.ingredients').html(ingredients.map(ingredient => `<li>${ingredient}</li>`).join(''));
      $('.instructions').text(instructions);
    });
  }
});


window.onload = function() {
  document.getElementById("cocktails").addEventListener("change", function() {
    getCocktailDescription(this.value);
  });
};
