

function getAllCocktails(){

    $.ajax({
        method: 'GET',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic',
  
        success: function(result) {
            console.log(result);
            getSevenRandomDrinks(result)
            advanceSlide();
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
  
    });
  }

  function getSevenRandomDrinks(result) {

    var getSevenRandomDrinks = result.drinks.sort(() => .5 - Math.random()).slice(0, 7)
    console.log(getSevenRandomDrinks)
    console.log(getSevenRandomDrinks.length)
  
    for (var i = 0; i < getSevenRandomDrinks.length; i++){
    console.log(getSevenRandomDrinks[i].strDrinkThumb)

    if (i === 0 ) {
      var img_url = (getSevenRandomDrinks[i].strDrinkThumb);
      var img_div =  '<div class="carousel-item active"> <div class="col-md-3"> <div class="card"> <div class="card-img"> <img src="' + img_url + '" class="img-fluid"> </div> <div class="card">' + getSevenRandomDrinks[i].strDrink + '</div></div></div></div>'
      $(".carousel-inner").append(img_div)
    }
    else {
    var img_url = (getSevenRandomDrinks[i].strDrinkThumb);
    var img_div =  '<div class="carousel-item"> <div class="col-md-3"> <div class="card"> <div class="card-img"> <img src="' + img_url + '" class="img-fluid"> </div> <div class="card">' + getSevenRandomDrinks[i].strDrink + '</div></div></div></div>'
    $(".carousel-inner").append(img_div)
    }
    }
  }

  function advanceSlide() {
    let items = document.querySelectorAll(".carousel .carousel-item");

    items.forEach((el) => {
      const minPerSlide = 4;
      let next = el.nextElementSibling;
      for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
          // wrap carousel by using first child
          next = items[0];
        }
        let cloneChild = next.cloneNode(true);
        el.appendChild(cloneChild.children[0]);
        next = next.nextElementSibling;
      }
    });
  }

  export { getAllCocktails};