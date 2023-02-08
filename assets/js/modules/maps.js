// Google maps module

/* Set some varibles to use throughout the modulae */
let map, service, infowindow;

/* function to get the places details from the Geo Co-ordinates from navigator
called from script.js 'Get location Event Handlers'
Passes results to getPlaceDetails for further details
calls createDataArray to produce highest rated
*/
function initMap(searchText) {
  console.log(searchText);
  // Request a location from the browser
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        const myLocation = new google.maps.LatLng(lat, lon);

        infowindow = new google.maps.InfoWindow();
        map = new google.maps.Map(document.getElementById("map"), {
          center: myLocation,
          zoom: 15,
        });

        const request = {
          radius: 3000,
          location: myLocation,
          query: searchText,
          fields: ["name", "formatted_address", "opening_hours", "website"],
        };

        service = new google.maps.places.PlacesService(map);

        service.textSearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const highlyRatedBars = [];
            for (let i = 0; i < results.length; i++) {
              getPlaceDetails(results[i]);
              createDataArray(results[i], highlyRatedBars);
            }
            createCards(highlyRatedBars.sort((x, y) => x[0] - y[0]).reverse());

            map.setCenter(results[0].geometry.location);
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

/* function to creat highest rated bar or store */
function createDataArray(place, bars) {
  //if (!place.geometry || !place.geometry.location) return;
  if (!place.photos || !place.rating) return;
  if (place.rating > 3) {
    bars.push([
      place.rating,
      place.name,
      place.formatted_address,
      place.photos[0].getUrl(),
      place.icon,
    ]);
  }
}

/* function to build html for cards to hold images of highest rate */
function createCards(d) {
  // Get the four highest rated
  // Create html elements
  let elements = "";
  for (let i = 0; i < 4; i++) {
    elements += `<div class="col">
        <div class="card h-100">                     
            <img src="${d[i][3]}" class="card-img-top" alt="image of ${d[i][1]}">
            <div class="card-body">
                <img src="${d[i][4]}" class="card-icon"></img>
                <h6 class="card-title">${d[i][1]}</h6>
                <p class="card-text"><i class="fa-solid fa-location-dot"></i> ${d[i][2]}</p>
                <p class="card-text"><i class="fa-solid fa-star"></i> ${d[i][0]}</p>
            </div>
        </div>
    </div>`;
  }
  $("#data-cards").html(elements);
}

/* function to create a marker on the google map
displays a number of properties which are retrieved from getPlaceDetails
Called from getPlaceDeatils
*/
function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  console.log(place.name);
  google.maps.event.addListener(marker, "click", () => {
    const content = document.createElement("div");
    const nameElement = document.createElement("h2");

    nameElement.textContent = place.name;
    content.appendChild(nameElement);

    /*  Add formatted address to info Window */
    const placeAddressElement = document.createElement("p");

    placeAddressElement.textContent = place.formatted_address;
    content.appendChild(placeAddressElement);

    /* Add isOpen to Info Window */
    if (place.opening_hours) {
      const isOpenNow = place.opening_hours.isOpen();

      const placeIsOpenElement = document.createElement("p");

      if (isOpenNow) {
        placeIsOpenElement.textContent = "Currrently Open";
      } else {
        placeIsOpenElement.textContent = "Currrently Closed";
      }
      content.appendChild(placeIsOpenElement);
    }

    /* Add opening times to Info Window */
    var placeOpenTimesElement = document.createElement("ol");

    content.appendChild(placeOpenTimesElement);

    var placesWeekdayText = place.opening_hours.weekday_text;

    for (var i = 0; i < placesWeekdayText.length; i++) {
      placeOpenTimesElement = placeOpenTimesElement + [i];
      var placeOpenTimesElement = document.createElement("li");
      placeOpenTimesElement.textContent = placesWeekdayText[i];
      content.appendChild(placeOpenTimesElement);
    }

    placeOpenTimesElement = document.createElement("ol");
    content.appendChild(placeOpenTimesElement);

    /* Add formatted phone number to Info Window */
    if (place.formatted_phone_number) {
      const placePhoneElement = document.createElement("p");

      placePhoneElement.textContent = place.formatted_phone_number;
      content.appendChild(placePhoneElement);
    }

    /* Add website url as anchor to Info Window */

    if (place.website) {
      const placeWebsiteElement = document.createElement("a");
      placeWebsiteElement.setAttribute("href", place.website);
      placeWebsiteElement.textContent = place.website;
      content.appendChild(placeWebsiteElement);
    }

    /* Set Info Window content and open it */
    infowindow.setContent(content);
    infowindow.open(map, marker);
  });
}

/* function to get extended place details such as openig hours from google place
return is passed to createMarker
*/
function getPlaceDetails(request) {
  service.getDetails(request, function (place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMarker(place);
    }
  });
}

/* Export functions */
export { initMap}