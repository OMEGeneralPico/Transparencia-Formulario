let jsonData = null;
let dataMap = null;
let markersLayer = null;
let heatLayer = null;
let heatmapOptions = { radius: 25, blur: 15, maxZoom: 18 };

document.getElementById('inputFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        jsonData = JSON.parse(event.target.result);
        const firstKey = Object.keys(jsonData)[0]; // Obtiene el primer elemento de la matriz
        const data = jsonData[firstKey]; // Accede a la matriz de ese elemento
        initializeMap();
        displayDataOnMap(data);
        populateDataSelect(data);
    };
    
    reader.readAsText(file);
});

document.getElementById('viewType').addEventListener('change', function() {
    if (jsonData) {
        const firstKey = Object.keys(jsonData)[0]; // Obtiene el primer elemento de la matriz
        const data = jsonData[firstKey]; // Accede a la matriz de ese elemento
        displayDataOnMap(data);
        toggleHeatmapControls();
    }
});

function initializeMap() {
    if (dataMap) {
        dataMap.remove();
    }
    dataMap = L.map('mapImp',).setView([-35.658412064282025, -63.76035690307618], 13);
    dataMap.addControl(new L.Control.Fullscreen());
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(dataMap);
}

function displayDataOnMap(data) {
    const viewType = document.getElementById('viewType').value;
    
    if (markersLayer) {
        dataMap.removeLayer(markersLayer);
    }
    if (heatLayer) {
        dataMap.removeLayer(heatLayer);
    }

    if (viewType === 'markers') {
        markersLayer = L.layerGroup();
        data.forEach(item => {
            const marker = L.marker([item.Coord.lat, item.Coord.lng]);
            const popupContent = `
                <b>Número:</b> ${item.Numero}<br>
                <b>Persona:</b> ${item.Persona}<br>
                <b>Dirección:</b> ${item.Direccion}<br>
                <b>Local:</b> ${item.Local}<br>
                <b>Índice:</b> ${item.Indice}<br>
                <b>Renta:</b> ${item.Renta}
            `;
            marker.bindPopup(popupContent);
            markersLayer.addLayer(marker);
        });
        markersLayer.addTo(dataMap);
    } else if (viewType === 'heatmap') {
        const heatData = data.map(item => [item.Coord.lat, item.Coord.lng]);
        heatLayer = L.heatLayer(heatData, heatmapOptions).addTo(dataMap);
    }
}

function toggleHeatmapControls() {
    const viewType = document.getElementById('viewType').value;
    const heatmapControls = document.getElementById('heatmapControls');
    if (viewType === 'heatmap') {
        heatmapControls.style.display = 'block';
    } else {
        heatmapControls.style.display = 'none';
    }
}

document.getElementById('blurSlider').addEventListener('input', function() {
    const blurValue = document.getElementById('blurSlider').value;
    document.getElementById('blurValue').innerText = blurValue;
    heatmapOptions.blur = parseInt(blurValue);
    updateHeatmap();
});

document.getElementById('radiusSlider').addEventListener('input', function() {
    const radiusValue = document.getElementById('radiusSlider').value;
    document.getElementById('radiusValue').innerText = radiusValue;
    heatmapOptions.radius = parseInt(radiusValue);
    updateHeatmap();
});

document.getElementById('maxZoomSlider').addEventListener('input', function() {
    const maxZoomValue = document.getElementById('maxZoomSlider').value;
    document.getElementById('maxZoomValue').innerText = maxZoomValue;
    heatmapOptions.maxZoom = parseInt(maxZoomValue);
    updateHeatmap();
});

function updateHeatmap() {
    if (heatLayer) {
        const data = jsonData[Object.keys(jsonData)[0]]; // Accede a la matriz de ese elemento
        const heatData = data.map(item => [item.Coord.lat, item.Coord.lng]);
        dataMap.removeLayer(heatLayer);
        heatLayer = L.heatLayer(heatData, heatmapOptions).addTo(dataMap);
    }
}

function populateDataSelect(data) {
    const dataSelect = document.getElementById('dataSelect');
    dataSelect.innerHTML = '';

    data.forEach((item, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = `Persona: ${item.Persona}`;
        dataSelect.appendChild(option);
    });

    // Event listener to update read-only data and center map when selection changes
    dataSelect.addEventListener('change', function() {
        const selectedIndex = dataSelect.value;
        const selectedItem = data[selectedIndex];
        displayReadOnlyData(selectedItem);
        centerMapOnCoordinate(selectedItem.Coord);
    });
}

function displayReadOnlyData(item) {
    const readOnlyContainer = document.getElementById('readOnlyData');
    readOnlyContainer.innerHTML = '';

    for (const key in item) {
        if (key !== 'Coord') {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = `${key}: ${item[key]}`;
            input.readOnly = true;
            readOnlyContainer.appendChild(input);
        } else {
            const latInput = document.createElement('input');
            latInput.type = 'text';
            latInput.value = `Lat: ${item.Coord.lat}`;
            latInput.readOnly = true;
            readOnlyContainer.appendChild(latInput);

            const lngInput = document.createElement('input');
            lngInput.type = 'text';
            lngInput.value = `Lng: ${item.Coord.lng}`;
            lngInput.readOnly = true;
            readOnlyContainer.appendChild(lngInput);
        }
    }
}

function centerMapOnCoordinate(coord) {
    dataMap.setView([coord.lat, coord.lng], 15);
    
    const viewType = document.getElementById('viewType').value;
    if (viewType === 'markers') {
        if (markersLayer) {
            markersLayer.clearLayers();
        }
        const marker = L.marker([coord.lat, coord.lng]);
        markersLayer.addLayer(marker);
        marker.addTo(dataMap);
    }
}
