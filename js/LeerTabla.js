
async function readJson() {
    const xhr = new XMLHttpRequest();

    // Abre la solicitud
    xhr.open('GET', '../../../json/apis.json');

    // Espera a que la solicitud se complete
    const response = await new Promise((resolve, reject) => {
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(new Error(`Error cargando JSON: ${xhr.statusText}`));
            }
        };

        xhr.onerror = reject;
        xhr.send();
    });

    // Parsea la respuesta JSON
    const data = JSON.parse(response);

    return data;
}
try {
    document.getElementById('botonIngreso').addEventListener('click',function(){
        getData();
      
   }); 
} catch (error) {
    
}

gapi.load('client', initClient);
var glob;
async function initClient() {
    const data = await readJson();
    glob = data;
    gapi.client.init({
        apiKey: data["GSheet"]["apiKey"],
        discoveryDocs: data["GSheet"]["discoveryDocs"],
    }).then(function () {
        // Llama a tus funciones aquí
    });
}
async function EncontrarTabla(tabla){
    try {
        const response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: glob["GSheet"]["spreadsheetId"],
            range: tabla+'!A2:F',
        });}catch (error) {

        }
}

async function getData() {
    try {
        const response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: glob["GSheet"]["spreadsheetId"],
            range: 'Users!A2:F',
        });
       
        
        const usersValues = response.result.values;
        const dni = document.getElementById("dni").value;
        const pass = document.getElementById("pass").value;

        for (let index = 0; index < usersValues.length; index++) {
            const userData = usersValues[index];
            console.log("hola");
            if (userData[0] === dni && userData[1] === pass) {
                console.log(userData);
                sessionStorage.setItem("Area", userData[2]);
                sessionStorage.setItem("Depto", userData[3]);
                sessionStorage.setItem("Accessos", userData[4]);
               
                const nomenclaturaResponse = await gapi.client.sheets.spreadsheets.values.get({
                    spreadsheetId: glob["GSheet"]["spreadsheetId"],
                    range: 'Nomeclatura!A2:E',
                });

                const nomenclaturaValues = nomenclaturaResponse.result.values;
                console.log(nomenclaturaValues);

                sessionStorage.setItem("Fechas", JSON.stringify(nomenclaturaValues));

                // Crear elementos HTML después de obtener los datos
                window.location.href = 'pages/Home.html';
                return;
            }
        }

        alert("Usuario no encontrado");
    } catch (error) {
        console.error("Error al obtener datos:", error);
        alert("Ocurrió un error al obtener los datos. Por favor, intenta nuevamente.");
    }
}


 

