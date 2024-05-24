var participaciones = [];
var index = 0;
function CambioEstado(valor) {
    console.log(valor);
    // Obtener el valor seleccionado
    var inicio = document.getElementById('inicio');
    var Inscriptos = document.getElementById('Inscriptos');
    var Cursando = document.getElementById('Cursando');
    var cierre = document.getElementById('cierre');
    var Finalizados = document.getElementById('Finalizados');
    if (valor == 'en_curso') {
        console.log('cursando');
        inicio.style.display = 'none';
        Inscriptos.style.display = 'none';
        Cursando.style.display = 'block';
        cierre.style.display = 'none';
        Finalizados.style.display = 'none';
    } else if (valor == 'comenzo') {
        console.log('comenzado');
        inicio.style.display = 'block';
        Inscriptos.style.display = 'block';
        Cursando.style.display = 'none';
        cierre.style.display = 'none';
        Finalizados.style.display = 'none';
    } else {
        console.log('finalizando');
        inicio.style.display = 'none';
        Inscriptos.style.display = 'none';
        Cursando.style.display = 'none';
        cierre.style.display = 'block';
        Finalizados.style.display = 'block';
    }

    // Mostrar el valor seleccionado en la consola (puedes hacer lo que quieras con él)
    console.log('El valor seleccionado es: ' + this.value);
}
document.getElementById('crearParticipacion').addEventListener('click', function() {
    // Buscamos las partes de participación
    const nombre = document.getElementById('nombreParticipacion');
    const colaboracion = document.getElementById('colaboracionParticipacion');
    const lugar = document.getElementById('lugarParticipacion');
    const actividad = document.getElementById('actividadParticipacion');

    const nombredef = nombre.value;
    const colaboraciondef = colaboracion.value;
    const lugardef = lugar.value;
    const actividaddef = actividad.value;

    const paginationContainer = document.getElementById('paginaParticipacion');
    const li = document.createElement('li');
    li.classList.add('page-item');
    li.style.color = 'blue';

    const link = document.createElement('a');
    link.classList.add('page-link');

    const indexLocal = participaciones.length;
    participaciones.push({ nombredef, colaboraciondef, lugardef, actividaddef });

    link.textContent = indexLocal + 1;
   

    // Marcamos el elemento actual como seleccionado
    link.classList.add('selected');
    // Creamos una función para manejar el evento 'click' con el valor correcto de 'indexLocal'
    link.addEventListener('click', function() {
        // Guardamos los valores actuales en el índice local antes de cambiar el índice global
        const links = document.querySelectorAll('.page-link');
        links.forEach(link => {
            link.classList.remove('selected');
        });

        // Marcamos el elemento actual como seleccionado
        link.classList.add('selected');
       
 
       if (nombre.value.length != 0) {
        const currentNombre = nombre.value;
        participaciones[index]['nombredef'] = currentNombre;
       }
       if (colaboracion.value.length != 0) {
        const currentColaboracion = colaboracion.value;
        participaciones[index]['colaboraciondef'] = currentColaboracion; }
        if (lugar.value.length != 0) {
        const currentLugar = lugar.value;
        participaciones[index]['lugardef'] = currentLugar; }
        if (actividad.value.length != 0) {
        const currentActividad = actividad.value;
        participaciones[index]['actividaddef'] = currentActividad; }
        console.log('participacion  ' +   participaciones[index]['nombredef']);
        // Cambiamos el índice global al índice local
        index = indexLocal;

        // Abrimos la información del nuevo índice global
        nombre.value = participaciones[index].nombredef;
        colaboracion.value = participaciones[index].colaboraciondef;
        lugar.value = participaciones[index].lugardef;
        actividad.value = participaciones[index].actividaddef;

        console.log('El índice es igual a ' + index);
    });

    console.log(participaciones);
    nombre.value = '';
    colaboracion.value = '';
    lugar.value = '';
    actividad.value = '';

    li.appendChild(link);
    paginationContainer.appendChild(li);
});

var solicitudes = [];
let indexSol = 0; // Variable global para el índice de solicitudes


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