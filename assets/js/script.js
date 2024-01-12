import {
  getRandomCocktails,
  main,
  getRecommendations,
  saveIngredients,
  showModal,
  saveFavoriteCocktail,
  showFavoritesModal,
} from './modules/logic.js'
import { initMap } from './modules/maps.js'

$(function () {
  // Hide location info
  $('.location').addClass('hide')

  // Load maps if geolocation available
  //   if (navigator.geolocation) {
  //     initMap('bars')
  //   }

  // Renders random cocktails sidebar
  getRandomCocktails()

  // Default search when page loads
  const defaultCocktail = 'Bloody Mary'
  main(defaultCocktail)

  // Event handler to get data from search input
  $('.cocktail-search-btn').on('click', () => {
    let userSearch = $('.cocktail-search-frm').val().trim()
    if (userSearch.length === 0) {
      let err = 'No Search Entered'
      let message =
        'No search term entered, please enter a cocktail name and try again'
      showModal(err, message)
    } else {
      main(userSearch)
      $('.cocktail-search-frm').val('')
    }
  })

  // Get location Event Handlers
  $('#location-buttons').on('click', (e) => {
    e.stopPropagation()
    if (navigator.geolocation) {
      $('.location').addClass('show')
      location.assign('#local-places')
      $('.find-place').text(e.target.attributes.id.value)
      initMap(e.target.attributes.id.value)
    }
  })

  // Popular Cocktails view event
  $('#popular-cocktails').on('click', (e) => {
    e.stopPropagation()
    main($(e.target).parent()[0].children[0].innerText)
    location.assign('#recipe')
  })

  // Settings
  $('#ingOneOp1').attr('checked', true)
  $('#ingTwoOp2').attr('checked', true)
  $('#settings-form').on('submit', (e) => {
    e.preventDefault()
    let ingOne = $('input[type="radio"][name="ingOneOp"]:checked').val()
    let ingTwo = $('input[type="radio"][name="ingTwoOp"]:checked').val()
    if (ingOne !== ingTwo) {
      saveIngredients(ingOne, ingTwo)

      setTimeout(() => {
        $('#settings').removeClass('show')
      }, 3000)

      $('.toast').toast('show')
      location.reload()
    } else {
      let err = 'Same Ingredient Selected'
      let message =
        'Same ingredient selected, you need to choose two different types'
      showModal(err, message)
    }
  })
  // Show settings
  $('#settings-button').on('click', () => {
    $('#settings').addClass('show')
  })

  // Close seting
  $('#close-button').on('click', () => {
    $('#settings').removeClass('show')
  })

  // Render recommended cocktails if prferences found
  if (localStorage.getItem('favorites')) {
    getRecommendations()
    $('#recommendations').addClass('show')
  }

  // Carousel events
  $('.carousel-inner').on('mouseenter', () => {
    $('.recommend-view').addClass('recommended-view')
  })

  $('.carousel-inner').on('click', '.recommend-view', (e) => {
    e.stopPropagation()
    main($(e.target)[0].attributes.value.value)
    location.assign('#recipe')
  })

  // Handles search if enter key pressed
  $('.cocktail-search-frm').on('keyup', (e) => {
    if (e.keyCode === 13) {
      if ($(e.target).val().trim().length === 0) {
        let err = 'No Search Entered'
        let message =
          'No search term entered, please enter a cocktail name and try again'
        showModal(err, message)
      } else {
        main($(e.target).val().trim())
        $(e.target).val('')
      }
    }
  })

  // Add to favorite cocktails
  $('#addFave').on('click', () => {
    let name = $('.cocktail-title').text()
    let image = $('.cocktail-image')[0].currentSrc
    let type = $('.cocktail-type').text()

    saveFavoriteCocktail(name, image, type)
  })

  // Show favorite cocktails
  $('#favoriteCocktils-button').on('click', () => {
    if (localStorage.getItem('favoriteCocktails')) {
      showFavoritesModal()
    } else {
      showModal(
        'Nothing here',
        'Nothing yet added! Go checkout some lovely cocktails and adds something.'
      )
    }
    if ($('#favorites-modal-body').html() === '') {
      $('#favorites-modal-body').text(
        'No items currently in your favorites. Go add something and return'
      )
    }
  })

  // Loads to cocktail details
  $('#favorites-modal-body').on('click', '#view-item', (e) => {
    main($(e.target).val())
    $('#favoritesModal').modal('hide')
    location.assign('#recipe')
  })

  //Removes a cocktail from favorites
  $('#favorites-modal-body').on('click', '#remove-item', (e) => {
    e.stopPropagation()
    let items = JSON.parse(localStorage.getItem('favoriteCocktails'))
    //console.log(items);
    let fave = $(e.target).parents().parents()[2]
    // Remove from dom
    $(fave).remove()

    // Remove from array
    let itemsSize = items.length

    items.forEach((i) => {
      if (JSON.parse(i).name === $(e.target).val()) {
        let index = items.indexOf(i)
        items.splice(index, 1)
      }
    })

    // Checks if item removed from array before saving
    if (itemsSize > items.length) {
      $('#favoritesModal').on('hidden.bs.modal', (e) => {
        e.stopPropagation()
        localStorage.setItem('favoriteCocktails', JSON.stringify(items))
      })
    }

    if ($('#favorites-modal-body').html() === '') {
      $('#favorites-modal-body').text(
        'No more items to remove, click close to save changes'
      )
    }
  })

  // Remove all from favorites
  $('#favoritesModal').on('click', '#modal-remove-all', (e) => {
    e.stopPropagation()
    $('#favorites-modal-body').html('All cleared, click close to save changes')

    localStorage.setItem('favoriteCocktails', JSON.stringify([]))
  })
})
