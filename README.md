![The Mixologist](./assets/images/logo.jpg)

# The Mixologists App

## Overview
This web application uses the thecocktaildb api to search and present details on your favourite cocktails. Then you can use the find a local bar or store buttons to get the cocktail, this uses the navigator.geolocation DOM API to get the current location of the calling machine which is passed to the Google places API to return the locations details, it then presents the 4 locations with the highest Google rating in a 3km radius , and where available a description on the cocktail is pulled from the Wikipedia API.

You can search for a specific cocktail if you know the name or use the search by ingredient option to search by a base liquor. On the left is a presentation of the most popular cocktails which is updated every time you visit the site.

***** something around the recommendations ****

There is some error checking from the data returned, to see if the cocktail exists or if the user didn’t enter any search criteria, if not a modal dialog is displayed with information on how to correct the error.

## How to use
**Search for by Cocktail Name:**

- Click on Search for a cocktail bar

- Enter a cocktail

- Click the Search button

- Displays the title of the cocktail

- Displays an image of the cocktail

- Displays a description of the cocktail

- Displays the ingredients and the amounts of the cocktail

- Displays the instructions on how to make the cocktail

**Choose one from our list**

- From the left drop down box 'Select a base ingredient'

- This will populate the 'Select a cocktail' drop down box

- Select a cocktail from the drop-down box

- Displays the title of the cocktail

- Displays an image of the cocktail

- Displays a description of the cocktail

- Displays the ingredients and the amounts of the cocktail

- Displays the instructions on how to make the cocktail

**Find Bars Near Me**

- Click on Find Bars Near Me button

- If prompted choose 'Allow Location Services'

- This populates the Top-Rated Bars Near Me section with the 4 highest rated bars in the location

- Show a Google map with pins of the bars found in a 3Km radius

- Click on a pin to get further details of the bar(Details are only presented if available):
    - Name
    - Address
    - Current opening status
    - Opening times for the week
    - Telephone Number
    - Website Link

**Find Stores Near Me**

- Click on Find Store Near Me button

- If prompted choose 'Allow Location Services'

- This populates the Top-Rated Stores Near Me section with the 4 highest rated stores in the location

- Show a Google map with pins of the stores found in a 3Km radius

- Click on a pin to get further details of the store(Details are only presented if available):
    - Name
    - Address
    - Current opening status
    - Opening times for the week
    - Telephone Number
    - Website Link

## Popular Cocktails

- This section on the left-hand side presents a different list of 4 popular cocktails every time the site is visited.

- Just click on the 'view' button to get all the details of the cocktail

## Site Makeup

HTML (HyperText Markup Language)

CSS (Cascading Style Sheets)/ BootStrap

JS (JavaScript) / JQuery

theCocktailDB API

Geolocation DOM API

Google Places API

Wikiepedia API

## Site
GitHub Public Repo

https://github.com/misterouija/the-mixologist

GitHub Page Link

https://misterouija.github.io/the-mixologist/

## Screenshots
![The Mixologist](./assets/images/screenshot.jpeg)
