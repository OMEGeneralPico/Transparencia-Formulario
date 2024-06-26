
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los elementos con la clase 'mapa'
    var mapElements = document.querySelectorAll('.mapa');
  
    // Iterar sobre cada elemento y crear un mapa para cada uno
    mapElements.forEach(function(mapElement) {
        // Inicializar el mapa
        var map = L.map(mapElement).setView([-35.656, -63.757], 13); // Coordenadas aproximadas de General Pico, La Pampa
        
        // Añadir capa de mapa base
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Campo de entrada para las coordenadas (asumiendo que hay un campo de entrada dentro del mismo contenedor del mapa)
     

        // Variable para el marcador
        var marker;
       
        mapas[mapElement.getAttribute('tipoMapa')+'map'] = map;
        console.table(mapas);
        // Evento de clic en el mapa
        map.on('click', function(e) {
            const tipoMapa = mapElement.getAttribute('tipoMapa');
            var coordinatesInput = document.getElementById('coord' + tipoMapa);
        
            var lat = e.latlng.lat;
            var lng = e.latlng.lng;
        
            // Si ya hay un marcador, borrarlo y crear uno nuevo
            if (marcadores[tipoMapa + 'map']) {
                map.removeLayer(marcadores[tipoMapa + 'map']);
            }
        
            // Crear un nuevo marcador
            marker = L.marker(e.latlng).addTo(map);
            marcadores[tipoMapa + 'map'] = marker;
        
            // Guardar las coordenadas en el campo de entrada
            coordinatesInput.value = lat + ", " + lng;
        });
        
        

        // Función para borrar cualquier marcador en el mapa
      
    });
});
 function removeAllMarkers(nombreTipoMapa,variableGlobal,index) {
    console.log(window[variableGlobal]);
    if(window[variableGlobal][index]== null || window[variableGlobal][index][2] == null ||  window[variableGlobal][index][2] == ''){

    
    if (marcadores[nombreTipoMapa] != null) {
        mapas[nombreTipoMapa].removeLayer(marcadores[nombreTipoMapa]);
        
        marcadores[nombreTipoMapa] = null;
    }else{
       
    }}else{

        let coord = window[variableGlobal][index][2].split(", ");
        if (marcadores[nombreTipoMapa] == null) {
            marcadores[nombreTipoMapa] = L.marker(coord).addTo(mapas[nombreTipoMapa]);
        }
        marcadores[nombreTipoMapa].setLatLng(coord);
    }
   
    
   
}

mapas={};
marcadores={};