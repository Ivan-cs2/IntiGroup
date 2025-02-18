jQuery(document).ready(function($) {
    $(window).on('load', function() {
        let homeUrl = projectLocations[0].home_url;
        let svg_pin = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M172.3 501.7C27 291 0 269.4 0 192 0 86 86 0 192 0s192 86 192 192c0 77.4-27 99-172.3 309.7-9.5 13.8-29.9 13.8-39.5 0zM192 272c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80z"/></svg>';
        let svg_user = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/></svg>';
        let svg_dollar = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M160 0c17.7 0 32 14.3 32 32l0 35.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11l0 33.4c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-34.9c-.4-.1-.9-.1-1.3-.2l-.2 0s0 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7s0 0 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11L128 32c0-17.7 14.3-32 32-32z"/></svg>';

        var map;
        var currentInfoWindow = null;
        var actualZoom = 5; // Set default zoom level for the map

        var customIcon = {
            url: homeUrl + '/wp-content/uploads/map/logo.svg',
            scaledSize: new google.maps.Size(35, 35),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17.5, 35)
        };

        function initMap() {
            var australiaBounds = {
                north: -9.219,
                south: -54.751,
                west: 112.9211,
                east: 159.255
            };

            var customTheme = [
                {"elementType": "geometry", "stylers": [{"color": "#f5f5f5"}]},
                {"elementType": "labels.icon", "stylers": [{"visibility": "off"}]},
                {"elementType": "labels.text.fill", "stylers": [{"color": "#616161"}]},
                {"elementType": "labels.text.stroke", "stylers": [{"color": "#f5f5f5"}]},
                {"featureType": "administrative.land_parcel", "stylers": [{"color": "#bdbdbd"}]},
                {"featureType": "poi", "elementType": "geometry", "stylers": [{"color": "#eeeeee"}]},
                {"featureType": "poi", "elementType": "labels.text.fill", "stylers": [{"color": "#757575"}]},
                {"featureType": "poi.park", "elementType": "geometry", "stylers": [{"color": "#e5e5e5"}]},
                {"featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{"color": "#9e9e9e"}]},
                {"featureType": "road", "elementType": "geometry", "stylers": [{"color": "#ffffff"}]},
                {"featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{"color": "#757575"}]},
                {"featureType": "road.highway", "elementType": "geometry", "stylers": [{"color": "#dadada"}]},
                {"featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{"color": "#616161"}]},
                {"featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{"color": "#9e9e9e"}]},
                {"featureType": "transit.line", "elementType": "geometry", "stylers": [{"color": "#e5e5e5"}]},
                {"featureType": "transit.station", "elementType": "geometry", "stylers": [{"color": "#eeeeee"}]},
                {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#5BA0E4"}]},
                {"featureType": "water", "elementType": "labels.text.fill", "stylers": [{"color": "#9e9e9e"}]}
            ];

            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: -28.344428, lng: 121.036882 },
                zoom: actualZoom, // Default zoom level on page load
                disableDefaultUI: true,
                zoomControl: true,
                fullscreenControl: true,
                styles: customTheme,
                restriction: { latLngBounds: australiaBounds, strictBounds: true }
            });

            var bounds = new google.maps.LatLngBounds();

            projectLocations.forEach(function(location, index) {
                var latLng = new google.maps.LatLng(location.lat, location.lng);
                if (latLng) {
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        title: location.title,
                        icon: customIcon
                    });

                    var infoWindowContent = `<div class="map-content">
                        <img src="${location.image}" alt="${location.title}" />
                        <h4><a href="${location.url}">${location.title}</a></h4>
                        <p class="project-info"><a href="${location.url}">${svg_pin} ${location.project_location}</a></p>
                        <p class="project-info"><span>${svg_user} ${location.client}</span></p>
                        <p class="project-info"><span>${svg_dollar} ${location.project_value}</span></p>
                    </div>`;

                    var infoWindow = new google.maps.InfoWindow({
                        content: infoWindowContent
                    });

                    marker.addListener('click', function() {
                        if (currentInfoWindow) currentInfoWindow.close();
                        infoWindow.open(map, marker);
                        currentInfoWindow = infoWindow;
                        map.setCenter(marker.getPosition());
                        map.setZoom(8); // Zoom in on marker click
                    });

                    infoWindow.addListener('closeclick', function() {
                        map.setZoom(actualZoom); // Reset zoom to default after closing the info window
                        map.setCenter({ lat: -28.344428, lng: 121.036882 }); // Reset center to default
                    });

                    bounds.extend(marker.position);
                }
            });

            map.addListener('click', function() {
                if (currentInfoWindow) {
                    currentInfoWindow.close();
                    currentInfoWindow = null;
                    map.setZoom(actualZoom); // Reset zoom to default on map click
                    map.setCenter({ lat: -28.344428, lng: 121.036882 }); // Reset center to default
                }
            });

            if (projectLocations.length > 1) {
                map.fitBounds(bounds);
            }
        }

        initMap();
    });
});
