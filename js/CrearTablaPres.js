fetch('../json/entidades.json')
  .then(response => response.json())
  .then(data => {
    TablaAuto(data); // Muestra el contenido del archivo JSON en la consola
    // También puedes mostrarlo en la página web
    // por ejemplo, asignándolo al contenido de un elemento HTML
    // document.getElementById('resultado').innerText = JSON.stringify(data);
  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));

  function TablaAuto(data) {
    const tbody = document.getElementById("tablaPresupuesto");
    for (let index = 0; index < data["Economia"].length; index++) {



        const newRow = document.createElement("tr");
        const name = document.createElement("td");
        name.textContent = data["Economia"][index];
        newRow.appendChild(name);



        const cell = document.createElement("td");

        const abuelo = document.createElement("div");
        abuelo.setAttribute("class","col-auto");


        const padreTodo = document.createElement("div");
        padreTodo.setAttribute("class","input-group");
        const padreMarca = document.createElement("div");
        padreMarca.setAttribute("class","input-group-prepend");
      
        const marca = document.createElement("div");
        marca.setAttribute('class','input-group-text form-control');
        marca.textContent = '$';

        padreMarca.appendChild(marca);
        padreTodo.appendChild(padreMarca);
        const inputText = document.createElement("input");
        inputText.setAttribute("type", "text");
        inputText.setAttribute("id", "cell1Input");
        inputText.classList.add("form-control");
             
        cell.textContent = ""; // Elimina el texto "Nuevo dato 1"
        cell.appendChild(abuelo); // Agrega el input text a la celda
        padreTodo.appendChild(inputText);
        abuelo.appendChild(padreTodo);
        newRow.appendChild(cell);
        tbody.appendChild(newRow);
    }
  



   
  
  }