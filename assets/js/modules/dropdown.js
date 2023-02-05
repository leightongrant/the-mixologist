const baseIngredients = ['rum', 'vodka', 'gin', 'tequila', 'whiskey'];

const selectBaseIngredient = document.querySelector('#base-ingredient');

baseIngredients.forEach(ingredient => {
  const option = document.createElement('option');
  option.value = ingredient;
  option.text = ingredient;
  selectBaseIngredient.appendChild(option);
});

const selectCocktail = document.querySelector('#cocktails');

selectBaseIngredient.addEventListener('change', async function() {
  const selectedIngredient = this.value;
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${selectedIngredient}`);
  const data = await response.json();
  selectCocktail.innerHTML = '';
  data.drinks.forEach(drink => {
    const option = document.createElement('option');
    option.value = drink.idDrink;
    option.text = drink.strDrink;
    selectCocktail.appendChild(option);
  });
});

// Event listener for the dropdown menu
document.querySelector("#cocktails").addEventListener("change", async function() {
  // Get the selected cocktail's id
  const id = this.value;

  // Fetch the cocktail data from the API
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  const cocktail = data.drinks[0];

  // Get the ingredients, instructions, and image URL
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    if (cocktail[`strIngredient${i}`]) {
      ingredients.push(
        `${cocktail[`strMeasure${i}`]} ${cocktail[`strIngredient${i}`]}`
      );
    }
  }

  const instructions = cocktail.strInstructions;
  const imageURL = cocktail.strDrinkThumb;

  // Update the HTML elements with the cocktail data
  document.querySelector(".ingredients").innerHTML = ingredients
    .map(ingredient => `<li>${ingredient}</li>`)
    .join("");
  document.querySelector(".instructions").textContent = instructions;
});
