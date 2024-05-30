// Listener para botones con clase 'agregar'
const botonesAgregar = document.getElementsByClassName('agregar');
Array.from(botonesAgregar).forEach(boton => {
    boton.addEventListener('click', function(event) {
        const ids = JSON.parse(event.target.getAttribute('ids'));
        const idIndex = event.target.getAttribute('idIndex');
        const listaNombres = JSON.parse(event.target.getAttribute('lista'));
       
        let listaNombre = listaNombres[0];
        
        // Asegurarse de que la lista global esté inicializada
        if (window[listaNombre] == null) {
            window[listaNombre] = [];
        }
        
        // Crear el elemento de opción
        const optionElement = document.createElement('option');
        const paginationContainer = document.getElementById(idIndex);

        // Determinar el índice local sin almacenar valores
        const indexLocal = window[listaNombre].length;
        let indexNombre = listaNombre + 'Index';
        window[indexNombre] = indexLocal;

        // Agregar un array vacío para mantener la consistencia de los índices
        window[listaNombre].push([]);
       
        optionElement.textContent = 'Nro ' + (indexLocal + 1);
        optionElement.value = indexLocal;

        // Crear listener para la opción
        optionElement.addEventListener('click', function() {
            // Asignar el índice local al índice global
            window[indexNombre] = parseInt(optionElement.value);
        
            if (window[listaNombre][window[indexNombre]].length > 0) {
                const valoresActuales = window[listaNombre][window[indexNombre]];
                valoresActuales.forEach((valor, index) => {
                    document.getElementById(ids[index]).value = valor;
                });
            } else {
                ids.forEach(id => {
                    document.getElementById(id).value = '';
                });
            }
        });

        paginationContainer.appendChild(optionElement);

        // Vaciar los campos después de crear el elemento
        ids.forEach(id => {
            document.getElementById(id).value = '';
        });

        // Función para eliminar un elemento
        function eliminarElemento() {
            const selectElement = document.getElementById(idIndex);
            const indexToDelete = window[indexNombre];
        
            if (indexToDelete !== undefined && indexToDelete !== null) {
                // Eliminar el elemento del array global
                window[listaNombre].splice(indexToDelete, 1);
        
                // Eliminar la opción del select
                const optionToRemove = selectElement.querySelector(`option[value='${indexToDelete}']`);
                if (optionToRemove) {
                    selectElement.removeChild(optionToRemove);
                }
        
                // Actualizar los índices de las opciones restantes
                Array.from(selectElement.options).forEach((opt, i) => {
                    opt.value = i;
                    opt.textContent = 'Nro ' + (i + 1);
                });
        
                // Actualizar los índices locales en window
                for (let i = 0; i < window[listaNombre].length; i++) {
                    if (i >= indexToDelete) {
                        window[listaNombre + 'Index'] = i;
                    }
                }
        
                console.log('Elementos después de borrar:', window[listaNombre]);
            } else {
                console.error('No se encontró un índice válido para borrar.');
            }
        }

        // Hacer la función accesible globalmente para poder llamarla desde el botón "Quitar"
        window.eliminarElemento = eliminarElemento;
    });
});

// Listener para botón 'guardar'
document.getElementById('guardar').addEventListener('click', function(event) {
    const ids = JSON.parse(this.getAttribute('ids'));
    const listaNombres = JSON.parse(this.getAttribute('lista'));
    let listaNombre = listaNombres[0];
    let indexNombre = listaNombre + 'Index';

    const valores = ids.map(id => document.getElementById(id).value);
    if (window[indexNombre] !== undefined && window[indexNombre] !== null) {
        window[listaNombre][window[indexNombre]] = valores;
    } else {
        window[listaNombre].push(valores);
        window[indexNombre] = window[listaNombre].length - 1;
    }

    console.log('Información guardada:', window[listaNombre]);
});

// Listener para botón 'quitar'
document.getElementById('quitarParticipacion').addEventListener('click', function() {
    if (typeof window.eliminarElemento === 'function') {
        window.eliminarElemento();
    } else {
        console.error('La función eliminarElemento no está definida.');
    }
});
