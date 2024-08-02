// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el mapa
    var map = L.map('map').setView([-35.656, -63.757], 20); // Coordenadas aproximadas de General Pico, La Pampa

    // Añadir capa de mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Inicializar la capa de dibujo
    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Configurar las opciones de dibujo
    var drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems
        },
        draw: {
            polygon: true,
            polyline: false,
            rectangle: false,
            circle: false,
            marker: false,
            circlemarker: false
        }
    });
    map.addControl(drawControl);

    // Arreglo para almacenar las coordenadas de los polígonos
    var cuadras = [];

    // Evento cuando se crea un nuevo polígono
    map.on(L.Draw.Event.CREATED, function(event) {
        var layer = event.layer;
        drawnItems.addLayer(layer);

        // Obtener las coordenadas del polígono
        var coordinates = layer.getLatLngs()[0].map(function(latlng) {
            return [latlng.lat, latlng.lng];
        });

        // Añadir las coordenadas al arreglo de cuadras
        cuadras.push(coordinates);

        // Mostrar las coordenadas en la consola
        console.log(cuadras);
    });

    // Función para descargar el JSON
    function downloadJSON(content, fileName) {
        var a = document.createElement("a");
        var file = new Blob([content], { type: 'application/json' });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    // Manejar el evento de clic en el botón de descarga
    document.getElementById('downloadJson').addEventListener('click', function() {
        var jsonContent = JSON.stringify({ cuadras: cuadras }, null, 2);
        downloadJSON(jsonContent, 'cuadras.json');
    });

    // Función para cargar y dibujar los polígonos desde un archivo JSON
    document.getElementById('loadJson').addEventListener('click', function() {
        var fileInput = document.getElementById('fileInput');
        var file = fileInput.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var content = e.target.result;
                var json = JSON.parse(content);
                json.cuadras.forEach(function(coordinates) {
                    var latlngs = coordinates.map(function(coord) {
                        return L.latLng(coord[0], coord[1]);
                    });
                    var polygon = L.polygon(latlngs, { color: 'blue' }).addTo(drawnItems);
                });
                // Añadir las coordenadas al arreglo de cuadras
                cuadras = json.cuadras;
                // Mostrar las coordenadas en la consola
                console.log(cuadras);
            };
            reader.readAsText(file);
        } else {
            alert('Por favor selecciona un archivo JSON primero.');
        }
    });

    // Función para cargar y dibujar los marcadores desde un archivo JSON
    document.getElementById('loadMarkersJson').addEventListener('click', function() {
        var fileInput = document.getElementById('fileInput');
        var file = fileInput.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var content = e.target.result;
                var json = JSON.parse(content);
                json.markers.forEach(function(marker) {
                    L.marker([marker.lat, marker.lng]).addTo(map);
                });
                // Mostrar los marcadores en la consola
                console.log(json.markers);
            };
            reader.readAsText(file);
        } else {
            alert('Por favor selecciona un archivo JSON primero.');
        }
    });
});
