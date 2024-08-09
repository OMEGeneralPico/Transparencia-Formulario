document.addEventListener('DOMContentLoaded', function() {
    var mapElements = document.querySelectorAll('.mapa');
  
    mapElements.forEach(function(mapElement) {
        var tipoMapa = mapElement.getAttribute('tipoMapa');
        var map = L.map(mapElement).setView([-35.656, -63.757], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        
        var marker;
        
        mapas[tipoMapa + 'map'] = map;
        console.table(mapas);
        map.on('click', function(e) {
            var coordinatesInput = document.getElementById('coord' + tipoMapa);
        
            var lat = e.latlng.lat;
            var lng = e.latlng.lng;
        
            if (marcadores[tipoMapa + 'map']) {
                map.removeLayer(marcadores[tipoMapa + 'map']);
            }
        
            marker = L.marker(e.latlng).addTo(map);
            marcadores[tipoMapa + 'map'] = marker;
        
            coordinatesInput.value = lat + ", " + lng;
        });
      
        mapElement.style.display = 'none';
    });
});

function removeAllMarkers(nombreTipoMapa, variableGlobal, index) {
    if (window[variableGlobal][index] == null || window[variableGlobal][index][2] == null || window[variableGlobal][index][2] == '') {
        if (marcadores[nombreTipoMapa] != null) {
            mapas[nombreTipoMapa].removeLayer(marcadores[nombreTipoMapa]);
            marcadores[nombreTipoMapa] = null;
        }
    } else {
        let coord = window[variableGlobal][index][2].split(", ");
        if (marcadores[nombreTipoMapa] == null) {
            marcadores[nombreTipoMapa] = L.marker(coord).addTo(mapas[nombreTipoMapa]);
        }
        marcadores[nombreTipoMapa].setLatLng(coord);
    }
}

mapas = {};
marcadores = {};

function showMap(mapType) {
    const mapElement = document.querySelector('.mapa[tipoMapa="' + mapType + '"]');
    if (mapElement) {
        mapElement.style.display = 'block';
        setTimeout(() => {
            mapas[mapType + 'map'].invalidateSize();
        }, 0);
    }
}
