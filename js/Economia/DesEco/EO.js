// Listener para botones con clase 'agregar'
const botonesAgregar = document.getElementsByClassName('agregar');
Array.from(botonesAgregar).forEach(boton => {
    boton.addEventListener('click', function(event) {
        const ids = JSON.parse(this.getAttribute('ids'));
        const idIndex = this.getAttribute('idIndex');
        const listaNombre = this.getAttribute('lista');
        const indexGlobalNombre = this.getAttribute('indexglobal');

        // Asegurarse de que la lista global esté inicializada
        if (window[listaNombre] == null) {
            window[listaNombre] = [];
        }

        // Crear el elemento de opción
        const optionElement = document.createElement('option');
        const paginationContainer = document.getElementById(idIndex);
        
        // Determinar el índice local sin almacenar valores
        const indexLocal = window[listaNombre].length;

        optionElement.textContent = 'Nro ' + (indexLocal + 1);

        // Crear listener para la opción
        optionElement.addEventListener('click', function() {
            if (window[listaNombre][indexLocal]) {
                const valoresActuales = window[listaNombre][indexLocal];
                valoresActuales.forEach((valor, index) => {
                    document.getElementById(ids[index]).value = valor;
                });
            }
            window[indexGlobalNombre] = indexLocal;
        });

        paginationContainer.appendChild(optionElement);

        // Vaciar los campos después de crear el elemento
        ids.forEach(id => {
            document.getElementById(id).value = '';
        });
    });
});

document.getElementById('crearSolicitud').addEventListener('click', function() {
    // Buscamos las partes de la solicitud
    const rubro = document.getElementById('rubro');
    const puesto = document.getElementById('puesto');
    const empresa = document.getElementById('empresa');
    const experiencia = document.getElementById('experiencia');

    const rubrodef = rubro.value;
    const puestodef = puesto.value;
    const empresadef = empresa.value;
    const experienciadef = experiencia.value;

    const paginationContainer = document.getElementById('paginasol');
    const li = document.createElement('li');
    li.classList.add('page-item');
    li.style.color = 'blue';

    const link = document.createElement('a');
    link.classList.add('page-link');

    const indexLocal = solicitudes.length;
    solicitudes.push({ rubrodef, puestodef, empresadef, experienciadef });

    link.textContent = indexLocal + 1;

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
        const currentRubro = rubro.value;
        const currentPuesto = puesto.value;
        const currentEmpresa = empresa.value;
        const currentExperiencia = experiencia.value;

        if (solicitudes[indexSol]) {
            solicitudes[indexSol].rubrodef = currentRubro;
            solicitudes[indexSol].puestodef = currentPuesto;
            solicitudes[indexSol].empresadef = currentEmpresa;
            solicitudes[indexSol].experienciadef = currentExperiencia;
        }

        // Cambiamos el índice global al índice local
        indexSol = indexLocal;

        // Abrimos la información del nuevo índice global
        rubro.value = solicitudes[indexSol].rubrodef;
        puesto.value = solicitudes[indexSol].puestodef;
        empresa.value = solicitudes[indexSol].empresadef;
        experiencia.value = solicitudes[indexSol].experienciadef;

        console.log('El índice es igual a ' + indexSol);
    });

    console.log(solicitudes);
    rubro.value = '';
    puesto.value = '';
    empresa.value = '';
    experiencia.value = '';

    li.appendChild(link);
    paginationContainer.appendChild(li);
});