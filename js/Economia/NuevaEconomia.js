var inputs = ['Importe', 'Cantidad', 'Mujeres', 'Varones', 'Servicios', 'Comercial', 'Productiva'];
/*document.getElementById('form').addEventListener('click',
window.addEventListener("DOMContentLoaded", function() {
    const yourForm = document.getElementById('form');
    yourForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const data = new FormData(yourForm);
        const action = e.target.action;
        fetch(action, {
            method: 'POST',
            body: data,
        }).then(() => {
            window.location.replace("../../pages/Home.html")
        })
    })
}));*/
var capacitaciones = [];
document.getElementById('crearCapacitacion').addEventListener('click', function () {
    // Crear elementos

    const nombre = document.getElementById('nombreCapacitacion');
    nombredef = nombre.value;
    const estadoCap = document.getElementById('estado');
    estadodef = estadoCap.value;
    const fechaInicio = document.getElementById('fechaini');
    fechaIniciodef = fechaInicio.value;
    const Inscriptos = document.getElementById('inscripts');
    inscriptosdef = Inscriptos.value;
    const fechaCierre = document.getElementById('fechacierr');
    fechaCierredef = fechaCierre.value;
    const Finaliza2 = document.getElementById('finaliza2');
    finaliza2def = Finaliza2.value;
    const cursando = document.getElementById('cursados');
    cursnadodef = cursando.value;


    capacitaciones[capacitaciones.length] = {nombredef,estadodef,fechaIniciodef,fechaCierredef,inscriptosdef,finaliza2def,cursnadodef}
console.log(capacitaciones);

const paginationContainer = document.getElementById('pagination');
  const li = document.createElement('li');
  li.classList.add('page-item');
  li.style.color = 'blue';
  const link = document.createElement('a');
  link.classList.add('page-link');
  
  link.textContent = capacitaciones.length;
  link.addEventListener('click', function(event) {
    //agregar cuando hago click en el obj, guardar la info actual y luego abrir la info
const index = link.textContent - 1;
    console.log(capacitaciones[index]);
   nombre.value = capacitaciones[index]['nombredef']; 
   estadoCap.value = capacitaciones[index]['estadodef']; 
   CambioEstado(estadoCap.value);
   fechaInicio.value = capacitaciones[index]['fechaIniciodef']; 
   Inscriptos.value = capacitaciones[index]['inscriptosdef']; 
   fechaCierre.value = capacitaciones[index]['fechaCierredef']; 
   Finaliza2.value = capacitaciones[index]['finaliza2def']; 
   cursando.value = capacitaciones[index]['cursnadodef']; 
   console.log(estadoCap.value);
   
  });
  nombre.value ='';
  estadoCap.value  ='comenzo';
  fechaInicio.value  ='';
  Inscriptos.value ='';
  fechaCierre.value  =''; 
  Finaliza2.value  ='';
  cursando.value  ='';
  li.appendChild(link);
  paginationContainer.appendChild(li);
    // Crear objeto con la información de la capacitación
  
   

});

document.getElementById('estado').addEventListener('change',()=>{
    console.log('el valor es ' + this.value);
    CambioEstado(event.target.value)
} );
