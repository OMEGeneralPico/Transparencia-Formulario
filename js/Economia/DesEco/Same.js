
let solicitudes = [];
let indexSol = -1; // Inicialmente no hay solicitudes seleccionadas

document.getElementById('participacionCrear').addEventListener('click', function() {
    // Buscamos las partes de la solicitud
    const nombre = document.getElementById('nombreParticipacion');
    const lugar = document.getElementById('lugarParticipacion');
    const collab = document.getElementById('colaboracionParticipacion');
    const actividad = document.getElementById('actividadParticipacion');
    
    const nombredef = nombre.value;
    const lugardef = lugar.value;
    const collabdef = collab.value;
    const actividaddef = actividad.value;

    const paginationContainer = document.getElementById('paginaParticipacion');
    const li = document.createElement('li');
    li.classList.add('page-item');
    li.style.color = 'blue';

    const link = document.createElement('a');
    link.classList.add('page-link');

    const indexLocal = solicitudes.length;
    solicitudes.push({ nombredef, lugardef, collabdef, actividaddef });
   
    link.textContent = indexLocal + 1;
    indexSol = indexLocal;
    
    // Creamos una función para manejar el evento 'click' con el valor correcto de 'indexLocal'
    link.addEventListener('click', function() {
        // Desmarcamos todos los elementos primero
        const links = document.querySelectorAll('.page-link');
        links.forEach(link => {
            link.classList.remove('selected');
        });
    
        // Marcamos el elemento actual como seleccionado
        link.classList.add('selected');
    
        // Guardamos los valores actuales en el índice global antes de cambiar el índice global
        const currentnombre = document.getElementById('nombreParticipacion').value;
        const currentColaboracion = document.getElementById('colaboracionParticipacion').value;
        const currentLugar = document.getElementById('lugarParticipacion').value;
        const currentActividad = document.getElementById('actividadParticipacion').value;
    
        // Asegurarse de que indexSol esté definido y en el rango correcto
        if (typeof indexSol !== 'undefined' && indexSol >= 0 && indexSol < solicitudes.length && currentnombre.length > 0) {
            solicitudes[indexSol].nombredef = currentnombre;
            solicitudes[indexSol].lugardef = currentLugar;
            solicitudes[indexSol].collabdef = currentColaboracion;
            solicitudes[indexSol].actividaddef = currentActividad;
        } else {
            console.warn('indexSol no está definido o está fuera de rango:', indexSol);
        }
    
        // Cambiamos el índice global al índice local
        indexSol = indexLocal;
    
        // Verificar que el nuevo índice esté en el rango correcto
        if (indexSol >= 0 && indexSol < solicitudes.length) {
            // Abrimos la información del nuevo índice global
            document.getElementById('nombreParticipacion').value = solicitudes[indexSol].nombredef;
            document.getElementById('lugarParticipacion').value = solicitudes[indexSol].lugardef;
            document.getElementById('colaboracionParticipacion').value = solicitudes[indexSol].collabdef;
            document.getElementById('actividadParticipacion').value = solicitudes[indexSol].actividaddef;
        } else {
            console.warn('indexSol después del cambio está fuera de rango:', indexSol);
        }
    
        console.log('El índice es igual a ' + indexSol);
    });

    console.log(solicitudes);
    nombre.value = '';
    lugar.value = '';
    collab.value = '';
    actividad.value = '';

    li.appendChild(link);
    paginationContainer.appendChild(li);
});

let eventos = [];
let indexEvent = -1; // Inicialmente no hay eventos seleccionados

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

    // Función para borrar cualquier marcador en el mapa
    function borrarMarcador() {
        if (marker) {
            map.removeLayer(marker);
            marker = null;
        }
    }

    // Manejo del evento 'click' en el botón 'crearParticipacion'
    document.getElementById('crearevento').addEventListener('click', function() {
        // Borrar cualquier marcador existente en el mapa
        borrarMarcador();

        // Obtener las partes del evento
        const fecha = document.getElementById('fecha').value;
        const evento = document.getElementById('evento').value;
        const coordinates = document.getElementById('coordinates').value;

        // Crear un nuevo evento y añadirlo al array de eventos
        const nuevoEvento = { fecha, evento, coordinates };
        const paginationContainer = document.getElementById('paginasMapa');
        const li = document.createElement('li');
        li.classList.add('page-item');
        li.style.color = 'blue';

        const link = document.createElement('a');
        link.classList.add('page-link');
        const indexLocal = eventos.length;
        eventos.push(nuevoEvento);

        link.textContent = indexLocal + 1;
        indexEvent = indexLocal;

        // Manejo del evento 'click' en el enlace de paginación
        link.addEventListener('click', function() {
            // Desmarcar todos los enlaces
            const links = document.querySelectorAll('.page-link');
            links.forEach(link => {
                link.classList.remove('selected');
            });

            // Marcar el enlace actual como seleccionado
            link.classList.add('selected');

            // Actualizar el índice global al índice local
            indexEvent = indexLocal;

            // Obtener las coordenadas del evento seleccionado y mover el marcador al nuevo lugar
            const selectedEvento = eventos[indexEvent];
            const coords = selectedEvento.coordinates.split(',').map(coord => parseFloat(coord));
            const newLatLng = L.latLng(coords[0], coords[1]);

            // Mover el marcador al nuevo lugar
            if (marker) {
                marker.setLatLng(newLatLng);
            } else {
                marker = L.marker(newLatLng).addTo(map);
            }

            // Actualizar las coordenadas en el campo de entrada
            coordinatesInput.value = selectedEvento.coordinates;
        });

        // Añadir el enlace de paginación al contenedor
        li.appendChild(link);
        paginationContainer.appendChild(li);

        // Limpiar los valores de los inputs
        document.getElementById('fecha').value = '';
        document.getElementById('evento').value = '';
        document.getElementById('coordinates').value = '';

        console.log(eventos);
    });
});