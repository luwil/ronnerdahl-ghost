var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 14.466824, lng: -60.870181},
        zoom: 15,
        disableDefaultUI: true,
        draggable: false,
        scrollwheel: false
    });
}
