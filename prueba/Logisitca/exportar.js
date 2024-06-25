// Inicializar el mapa en las coordenadas de General Pico
var map = L.map('map').setView([-35.656, -63.756], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var marker;
var locations = {}; // Objeto para guardar los datos con la estructura final

// Función para actualizar la coordenada en el formulario y el mapa
map.on('click', function(e) {
    var coord = e.latlng;
    var lat = coord.lat;
    var lng = coord.lng;
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker([lat, lng]).addTo(map);

    // Actualizar coordenadas en el formulario
    document.getElementById('coord').value = `Lat: ${lat}, Lng: ${lng}`;
});

// Función para agregar coordenadas y datos al objeto y al select
document.getElementById('addCoordinate').addEventListener('click', function() {
    var coordValue = document.getElementById('coord').value;
    var numero = document.getElementById('numero').value;
    var persona = document.getElementById('persona').value;
    var direccion = document.getElementById('direccion').value;
    var local = document.getElementById('local').value;
    var indice = document.getElementById('indice').value;
    var renta = document.getElementById('renta').value;
    var conjuntoNombre = document.getElementById('conjuntoNombre').value;

    // Validación de campos
    if (coordValue && numero && persona && direccion && local && indice && renta && conjuntoNombre) {
        var latLng = coordValue.replace('Lat: ', '').replace('Lng: ', '').split(', ');
        var lat = parseFloat(latLng[0]);
        var lng = parseFloat(latLng[1]);

        // Estructura de datos
        var newData = {
            Numero: numero.charAt(0).toUpperCase() + numero.slice(1),
            Persona: persona.charAt(0).toUpperCase() + persona.slice(1),
            Direccion: direccion.charAt(0).toUpperCase() + direccion.slice(1),
            Local: local.charAt(0).toUpperCase() + local.slice(1),
            Indice: indice.charAt(0).toUpperCase() + indice.slice(1),
            Renta: renta.charAt(0).toUpperCase() + renta.slice(1),
            Coord: {
                lat: lat,
                lng: lng
            }
        };

        // Agregar datos al objeto locations con la estructura final
        if (!locations[conjuntoNombre]) {
            locations[conjuntoNombre] = [];
        }
        locations[conjuntoNombre].push(newData);

        // Limpiar formulario (excepto nombre de conjunto)
        document.getElementById('dataForm').reset();
        document.getElementById('coord').value = '';

        // Actualizar select solo si es la primera vez que se agrega este nombre de conjunto
        if (document.getElementById('coordinates').querySelector(`option[value="${conjuntoNombre}"]`) === null) {
            var select = document.getElementById('coordinates');
            var option = document.createElement('option');
            option.text = conjuntoNombre;
            option.value = conjuntoNombre;
            select.add(option);
        }
    } else {
        alert('Por favor, complete todos los campos, incluido el nombre del conjunto, antes de agregar una coordenada.');
    }
});

// Función para cargar datos al seleccionar un conjunto en el select
document.getElementById('coordinates').addEventListener('change', function() {
    var selectedConjunto = this.value;
    if (selectedConjunto) {
        var conjuntoData = locations[selectedConjunto];
        if (conjuntoData) {
            // Mostrar solo el primer conjunto de datos (asumiendo que el select solo contiene nombres únicos)
            var firstData = conjuntoData[0];
            
            document.getElementById('conjuntoNombre').value = selectedConjunto;

            document.getElementById('numero').value = firstData.Numero;
            document.getElementById('persona').value = firstData.Persona;
            document.getElementById('direccion').value = firstData.Direccion;
            document.getElementById('local').value = firstData.Local;
            document.getElementById('indice').value = firstData.Indice;
            document.getElementById('renta').value = firstData.Renta;
            document.getElementById('coord').value = `Lat: ${firstData.Coord.lat}, Lng: ${firstData.Coord.lng}`;

            var lat = firstData.Coord.lat;
            var lng = firstData.Coord.lng;

            if (marker) {
                map.removeLayer(marker);
            }
            marker = L.marker([lat, lng]).addTo(map);
            map.setView([lat, lng], 13);
        }
    }
});

// Función para exportar los datos a un archivo JSON
document.getElementById('exportJson').addEventListener('click', function() {
    var jsonData = JSON.stringify(locations);
    var blob = new Blob([jsonData], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

// Función para limpiar los campos del formulario
document.getElementById('clearFields').addEventListener('click', function() {
    document.getElementById('dataForm').reset();
    document.getElementById('coord').value = '';
    // No limpiar el nombre del conjunto
});
