var solicitudes = [];
let indexSol = 0; // Variable global para el índice de solicitudes

const botones = document.getElementsByClassName('agregar');
Array.from(botones)
Array.from(botones).forEach(boton => {

boton.addEventListener('click', function(event) {

    const ids = JSON.parse(event.target.getAttribute('ids'));
    const lista = JSON.parse(event.target.getAttribute('lista'));
    const indexGlobal = event.target.getAttribute('indexglobal');
    const elementos = {};
    const valores = [];

      // Obtener la referencia de la ventana padre (o el marco principal)
      const parentWindow = window.parent;

      for (let index = 0; index < ids.length; index++) {
          const elemento = document.getElementById(ids[index]);
          valores[index] = elemento.value;
      }
  
      // Verificar si la lista está inicializada antes de obtener su longitud
      const listaInicializada = parentWindow[lista[0]] || [];
      const indexLocal = listaInicializada.length + 1;
  
      // Inicializar la lista si aún no lo está
      if (!parentWindow[lista[0]]) {
          parentWindow[lista[0]] = [];
      }
  
      parentWindow[lista[0]].push(valores);
  
      const optionElement = document.createElement('option');
      optionElement.textContent = 'Nro ' + indexLocal;
      parentWindow[indexGlobal] = indexLocal - 1;
  
      optionElement.addEventListener('click', function() {
          const valoresActuales = [];
  
          for (let index = 0; index < valores.length; index++) {
              valoresActuales.push(valores[index]);
              if (valoresActuales[index] !== '' && valoresActuales[index] !== null) {
                  parentWindow[lista[0]][parentWindow[indexGlobal]][index] = valoresActuales[index];
              }
          }
  
          parentWindow[indexGlobal] = indexLocal;
  
          for (let index = 0; index < valores.length; index++) {
              valores[index] = parentWindow[lista[0]][parentWindow[indexGlobal] - 1][index];
          }
  
          console.table(parentWindow[lista[0]]);
      });
  
      for (let index = 0; index < valores.length; index++) {
          valores[index] = '';
      }
  
      // Enviar un mensaje al padre para agregar el elemento al contenedor de paginación
      parentWindow.postMessage({ type: 'addOption', option: optionElement }, '*');
})})