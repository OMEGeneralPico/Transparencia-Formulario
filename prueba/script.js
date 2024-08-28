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

    // Inicializar la capa de marcadores
    var markersLayer = new L.FeatureGroup();
    map.addLayer(markersLayer);

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
                try {
                    var json = JSON.parse(content);

                    // Recorrer todas las claves del objeto JSON
                    Object.keys(json).forEach(function(key) {
                        var entries = json[key];
                        
                        // Verificar si el valor es un array
                        if (Array.isArray(entries)) {
                            entries.forEach(function(entry) {
                                // Asegurarse de que "Coord" y sus propiedades existen
                                if (entry.Coord && entry.Coord.lat !== undefined && entry.Coord.lng !== undefined) {
                                    var lat = entry.Coord.lat;
                                    var lng = entry.Coord.lng;
                                    var marker = L.marker([lat, lng]).addTo(markersLayer);

                                    // Añadir un evento de clic para eliminar el marcador
                                    marker.on('click', function() {
                                        markersLayer.removeLayer(marker);
                                    });
                                } else {
                                    console.warn(`Coordenadas faltantes en una de las entradas en la clave '${key}':`, entry);
                                }
                            });
                        }
                    });
                    
                } catch (err) {
                    console.error('Error al analizar el JSON:', err);
                    alert('Error al analizar el archivo JSON. Por favor verifica la estructura.');
                }
            };
            reader.readAsText(file);
        } else {
            alert('Por favor selecciona un archivo JSON primero.');
        }
    });
});
