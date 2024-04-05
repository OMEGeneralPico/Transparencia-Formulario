console.log(sessionStorage.getItem("Depto"));
console.log(sessionStorage.getItem("Area"));
console.log(sessionStorage.getItem("Accessos"));
HabilitarTabs();
function HabilitarTabs() {
    var partes = sessionStorage.getItem("Accessos").split(";");
  
    fetch('../json/entidades.json')
  .then(response => response.json())
  .then(data => {
    
    console.log( data[sessionStorage.getItem("Area")]);
    sessionStorage.setItem('Secciones',JSON.stringify(data[sessionStorage.getItem("Area")])); // Muestra el contenido del archivo JSON en la consola
    // También puedes mostrarlo en la página web
    // por ejemplo, asignándolo al contenido de un elemento HTML
    // document.getElementById('resultado').innerText = JSON.stringify(data);
  })
  let seccionesparseadas = JSON.parse(sessionStorage.getItem("Secciones"));
    globalAccesos = seccionesparseadas;
    console.log(globalAccesos);
    for (let index = 0; index < partes.length; index++) {  
        for (let indarea = 0; indarea < seccionesparseadas.length; indarea++) {
          if (sessionStorage.getItem("Accessos") == 'All') {
            
          }else{
           if (partes[index] == indarea) {
            var liElement = document.createElement("li");
        liElement.classList.add("nav-item");
        var aElement = document.createElement("a");
        aElement.classList.add("nav-link", "active");
        aElement.setAttribute("id", "home-tab");
        aElement.setAttribute("data-toggle", "tab");
        aElement.setAttribute("href", "#home");
        aElement.setAttribute("role", "tab");
        aElement.setAttribute("aria-controls", "home");
        aElement.setAttribute("aria-selected", "true");
        console.log( );
       aElement.textContent = seccionesparseadas[index]; // Texto dentro del enlace
        
        // Agregar el elemento a dentro de li
        liElement.appendChild(aElement);
        
        // Obtener el elemento ul con el id "navigator"
        var ulElement = document.getElementById("navigator");
        
        // Agregar el elemento li al elemento ul
        ulElement.appendChild(liElement); 
           }
            
        }
       
        
    }}
    // Crear el elemento a dentro de li
    Creador();
}
var globalAccesos = null;
function Creador() {

  var lista = document.getElementById('recordatorios');
  var partes = sessionStorage.getItem("Accessos").split(";");
  var fechas = JSON.parse(sessionStorage.getItem('Fechas'));
  console.log(fechas);
  sessionStorage.getItem("Accessos")
  var fechasparseadas = [];
  for (let index = 0; index < fechas.length; index++) {
    if (sessionStorage.getItem('Area') == fechas[index][0]) {
      for (let acceso = 0; acceso < partes.length; acceso++) {
        if (partes[acceso] == fechas[index][2]) {
          var faltantes = fechas[index][4].split(";");
          for (let faltas = 0; faltas < faltantes.length; faltas++) {
            if (faltantes[0] != 0) {
            
        
            var dateObject = new Date( fechas[index][3]);
            var currentDate = new Date();
            var difference = currentDate - dateObject;
            var nuevoLi = document.createElement('li');
            nuevoLi.className = "list-group-item d-flex justify-content-between align-items-center";
            nuevoLi.textContent = fechas[index][1];
            
            // Crear un nuevo elemento span
            var nuevoSpan = document.createElement('span');
            nuevoSpan.className = "badge bg-secondary badge-pill";
            
            var newdate = currentDate;
            console.log(newdate.getMonth());
            newdate.setMonth(faltantes[faltas] - 1);
            var monthName = newdate.toLocaleString('default', { month: 'long' });
            
            nuevoSpan.textContent = monthName;
            
            // Agregar el span como hijo del nuevo li
            nuevoLi.appendChild(nuevoSpan);
            
            // Agregar event listener para redirigir al hacer clic
            nuevoLi.addEventListener('click', function() {
                window.location.href = fechas[index][0]+'/'+fechas[index][1] + '.html'; // Cambiar 'index.html' por la URL deseada
            });
            
            // Aplicar estilo para mostrar cursor como una mano al pasar el mouse
            nuevoLi.style.cursor = 'pointer';
            
            // Agregar el nuevo elemento a la lista
            lista.appendChild(nuevoLi);
            
            
            
                        
                       
                        
                      }
                      // Crea un nuevo elemento li
             
                    }
                    
                  }
                
                }
              }
          }
        
          
        
            // Crear el elemento li
// Crear el elemento li


  

  

  
  
  // Clona el nuevo li y lo agrega a la lista

}
