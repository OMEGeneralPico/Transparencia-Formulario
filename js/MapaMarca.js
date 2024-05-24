document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el mapa
    var map = L.map('map').setView([-35.656, -63.757], 13); // Coordenadas aproximadas de General Pico, La Pampa

    // Añadir capa de mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Campo de entrada para las coordenadas
    var coordinatesInput = document.getElementById('coordinates');
    

    // Variable para el marcador
    var marker;

    // Evento de clic en el mapa
    map.on('click', function(e) {
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;

        // Si ya hay un marcador, moverlo
        if (marker) {
            marker.setLatLng(e.latlng);
        } else {
            // Si no hay marcador, crear uno nuevo
            marker = L.marker(e.latlng).addTo(map);
        }

        // Guardar las coordenadas en el campo de entrada
        coordinatesInput.value = lat + ", " + lng;
    });
});