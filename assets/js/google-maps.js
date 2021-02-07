function initMap() {
    var locations = [
        ['SAUDI ARABIA', 24.7136, 46.6753, 4],
        ['JORDAN', 31.9539, 35.9106, 5],
        ['LEBANON', 33.8938, 35.5018, 3],
        ['CANADA', 45.5017, 73.5673, 2]
      ];

    var map = new google.maps.Map(document.getElementById('myMap'), {
        zoom: 2,
        center: new google.maps.LatLng(33.8938, 35.5018),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    for (var i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        title: locations[i][0]
      });
    }
}