// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el mapa
    var map = L.map('map').setView([-35.656, -63.757], 13); // Coordenadas aproximadas de General Pico, La Pampa

    // Añadir capa de mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Función para cargar y crear el heatmap desde un archivo JSON
    document.getElementById('loadJson').addEventListener('click', function() {
        var fileInput = document.getElementById('fileInput');
        var file = fileInput.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var content = e.target.result;
                var json = JSON.parse(content);

                // Extraer las coordenadas de todos los puntos
                var heatData = [];
                Object.keys(json).forEach(function(category) {
                    json[category].forEach(function(item) {
                        if (item.Coord && item.Coord.lat && item.Coord.lng) {
                            heatData.push([item.Coord.lat, item.Coord.lng, 1]); // 1 es la intensidad por defecto
                        }
                    });
                });

                // Crear el heatmap y añadirlo al mapa
                L.heatLayer(heatData, {
                    radius: 22, // Radio de cada punto de calor
                    blur: 25, // Nivel de desenfoque
                    maxZoom: 1 // Nivel máximo de zoom donde el heatmap es visible
                }).addTo(map);
            };
            reader.readAsText(file);
        } else {
            alert('Por favor selecciona un archivo JSON primero.');
        }
    });
});

/* 
var reader = new FileReader();
reader.onload = function(e) {
    var content = e.target.result;
    var json = JSON.parse(content);

    // Extraer las coordenadas de todos los puntos
    var markers = [];
    Object.keys(json).forEach(function(category) {
        json[category].forEach(function(item) {
            if (item.Coord && item.Coord.lat && item.Coord.lng) {
                var marker = L.marker([item.Coord.lat, item.Coord.lng]);
                markers.push(marker);
            }
        });
    });

    // Crear un grupo de marcadores y añadirlo al mapa
    var markerGroup = L.layerGroup(markers);
    markerGroup.addTo(map);
};
reader.readAsText(file);
*/