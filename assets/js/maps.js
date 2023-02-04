// Google maps

// function initMap () {
//     const yourLocation = { lat: 52.9259504, lng: -0.6583851 };
//     const map = new google.maps.Map(document.getElementById("map"), {
//         center: yourLocation,
//         zoom: 13,
//     });

//     const marker = new google.maps.Marker({
//         position: yourLocation,
//         map: map,
//     });

// };


// window.initMap = initMap;



let map;
let service;
let infowindow;

function initMap () {
    const myLocation = new google.maps.LatLng(52.9259504, -0.6583851);
    //const pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        center: myLocation,
        zoom: 15,
    });

    const request = {
        type: ["bar"],
        radius: 2500,
        location: myLocation
    };

    service = new google.maps.places.PlacesService(map);

    service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const highlyRatedBars = [];
            for (let i = 0; i < results.length; i++) {

                createMarker(results[i]);
                createDataArray(results[i], highlyRatedBars);

            }
            createCards(highlyRatedBars.sort((x, y) => x[0] - y[0]).reverse());

            //console.log(highlyRatedBars);
            map.setCenter(results[0].geometry.location);
        }
    });




}

function createDataArray (place, bars) {
    //if (!place.geometry || !place.geometry.location) return;
    if (!place.photos || !place.rating) return;
    if (place.rating > 3) {
        bars.push([place.rating, place.name, place.formatted_address, place.photos[0].getUrl(), place.icon]);
    }
}
function createCards (d) {
    // Get the four highest rated
    // Create html elements
    let elements = '';
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
    $('#data-cards').html(elements);
}

function createMarker (place) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
    });

    google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(`${place.name}<br><strong>${place.rating}</strong>` || "");
        infowindow.open({
            anchor: marker,
            map,
        });
    });
}

window.initMap = initMap;