var map, service, infowindow;

function getLocation() {
    //event.preventDefault();
    navigator.geolocation.getCurrentPosition(callbackLocation, showError  );
  }


  function callbackLocation(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    getBar(lat,lon)
 }

 function getBar(lat,lon) {

    const location = new google.maps.LatLng(lat, lon);
  
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map-canvas"), {
      center: location,
      zoom: 15,
      radius: 8000
    });
  
    const request = {
      location: location,
      radius: '10000',
      query: "bar",
      fields: ["name", "formatted_address", "geometry"],
    };
  
     service = new google.maps.places.PlacesService(map);
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        for (let i = 0; i < results.length; i++) {
          console.log(results[i])
          createMarker(results[i]);
        }
  
        map.setCenter(results[0].geometry.location);
      }
    });
  }
  
  function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;
  
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });
  
   console.log(place.name)
    google.maps.event.addListener(marker, "click", () => {
  
      const content = document.createElement("div");
      const nameElement = document.createElement("h2");
  
      nameElement.textContent = place.name;
      content.appendChild(nameElement);
  
      // const placeIdElement = document.createElement("p");
  
      // placeIdElement.textContent = place.place_id;
      // content.appendChild(placeIdElement);
  
      const placeAddressElement = document.createElement("p");
  
      placeAddressElement.textContent = place.formatted_address;
      content.appendChild(placeAddressElement);
  
      infowindow.setContent(content);
      infowindow.open(map, marker);
    });
  }
    
    
    function showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.log("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          console.log("An unknown error occurred.");
          break;
      }
    }

    $('#myModal').on('show.bs.modal', function() {
        $("#modal-title").text("Find Where To Get A Cocktail")
        getLocation();
        google.maps.event.trigger(map, 'resize');
     })

     export {getLocation};