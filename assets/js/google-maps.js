function initMap() {
    // Latitude and Longitude
    var myLatLng = {lat: 24.7135517, lng: 46.6752957};

    var map = new google.maps.Map(document.getElementById('myMap'), {
        zoom: 17,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Riyadh, KSA' // Title Location
    });
}