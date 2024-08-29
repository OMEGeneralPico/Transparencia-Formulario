(function() {
    let jsonData = null;
    let dataMap = null;
    let markersLayer = null;
    let heatLayer = null;
    let heatmapOptions = { radius: 25, blur: 15, maxZoom: 18 };

    document.addEventListener('DOMContentLoaded', function() {
        // Load the fixed JSON data on page load
        fetch('datos.json')
            .then(response => response.json())
            .then(data => {
                jsonData = data;
                initializeFixedData();
            })
            .catch(error => console.error('Error loading JSON data:', error));
    });

    function initializeFixedData() {
        const firstKey = Object.keys(jsonData)[0];
        const data = jsonData[firstKey];
        if (!data) {
            console.error('No data found for the first key:', firstKey);
            return;
        }
        initializeMap('fixedMap');
        displayDataOnMap(data);
        populateFixedDataSelect(jsonData);
    }

    function initializeMap(mapId) {
        if (dataMap) {
            dataMap.remove();
        }
        dataMap = L.map(mapId).setView([-35.658412064282025, -63.76035690307618], 13);  dataMap.addControl(new L.Control.Fullscreen());
        document.getElementById('datos-fijos-tab').addEventListener('click', function() {
       
            setTimeout(function() { 
                if (dataMap) {console.log("Hola");
                    dataMap.invalidateSize();  // Recalcula el tamaño del mapa
        
                    // Ajusta el zoom y centra el mapa si es necesario
                   
                }
            }, 200);  // Asegúrate de que el mapa esté completamente visible
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(dataMap);
    }
  
    function displayDataOnMap(data) {
        if (!data || !Array.isArray(data)) {
            console.error('Invalid data provided to displayDataOnMap:', data);
            return;
        }

        if (markersLayer) {
            dataMap.removeLayer(markersLayer);
        }
        if (heatLayer) {
            dataMap.removeLayer(heatLayer);
        }

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
    }

    function displayHeatmap(data) {
        if (!data || !Array.isArray(data)) {
         
            console.error('Invalid data provided to displayHeatmap:', data);
            return;
        }

        const heatData = data.map(item => [item.Coord.lat, item.Coord.lng, 0.5]);
        
        if (heatLayer) {
            dataMap.removeLayer(heatLayer);
        }

        heatLayer = L.heatLayer(heatData, heatmapOptions).addTo(dataMap);
    }

    function populateFixedDataSelect(data) {
        const fixedDataSelect = document.getElementById('fixedDataSelect');
        fixedDataSelect.innerHTML = '';

        Object.keys(data).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.text = key;
            fixedDataSelect.appendChild(option);
        });

        fixedDataSelect.addEventListener('change', function() {
            const selectedKey = fixedDataSelect.value;
            const selectedData = jsonData[selectedKey];
            if (!selectedData) {
                console.error('No data found for the selected key:', selectedKey);
                return;
            }
            updateViewType(selectedData);
            populateDataSelect(selectedData, 'fixedDataSelectMarkers', 'fixedReadOnlyData');
        });

        fixedDataSelect.dispatchEvent(new Event('change'));
    }

    function updateViewType(data) {
        const viewType = document.getElementById('fixedViewType').value;
        dataMap.removeLayer(markersLayer);
        if (viewType === 'markers') {
            displayDataOnMap(data);
            document.getElementById('fixedHeatmapControls').style.display = 'none';
        } else if (viewType === 'heatmap') {
            displayHeatmap(data);
            document.getElementById('fixedHeatmapControls').style.display = 'block';
        }
    }

    document.getElementById('fixedViewType').addEventListener('change', function() {
        const selectedKey = document.getElementById('fixedDataSelect').value;
        const selectedData = jsonData[selectedKey];
        if (!selectedData) {
            console.error('No data found for the selected key:', selectedKey);
            return;
        }
        updateViewType(selectedData);
    });

    function populateDataSelect(data, selectId, containerId) {
        const select = document.getElementById(selectId);
        select.innerHTML = '';

        data.forEach((item, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.text = `Marcador ${index + 1}`;
            select.appendChild(option);
        });

        select.addEventListener('change', function() {
            const selectedIndex = select.value;
            const selectedItem = data[selectedIndex];
            populateReadOnlyData(selectedItem, containerId);
            focusOnMarker(selectedItem);
        });

        select.dispatchEvent(new Event('change'));
    }

    function populateReadOnlyData(data, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group mb-2';

        for (const key in data) {
            if (key !== 'Coord') {
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'form-control';
                input.value = `${key}: ${data[key]}`;
                input.readOnly = true;
                inputGroup.appendChild(input);
            } else {
                const latInput = document.createElement('input');
                latInput.type = 'text';
                latInput.className = 'form-control';
                latInput.value = `Lat: ${data.Coord.lat}`;
                latInput.readOnly = true;
                inputGroup.appendChild(latInput);

                const lngInput = document.createElement('input');
                lngInput.type = 'text';
                lngInput.className = 'form-control';
                lngInput.value = `Lng: ${data.Coord.lng}`;
                lngInput.readOnly = true;
                inputGroup.appendChild(lngInput);
            }
        }

        container.appendChild(inputGroup);
    }

    function focusOnMarker(data) {
        if (data && data.Coord) {
            dataMap.setView([data.Coord.lat, data.Coord.lng], 13);
        }
    }

    // Event listeners for heatmap sliders
    document.getElementById('fixedBlurSlider').addEventListener('input', function() {
        heatmapOptions.blur = parseInt(this.value);
        document.getElementById('fixedBlurValue').textContent = this.value;
        const selectedKey = document.getElementById('fixedDataSelect').value;
        const selectedData = jsonData[selectedKey];
        displayHeatmap(selectedData);
    });

    document.getElementById('fixedRadiusSlider').addEventListener('input', function() {
        heatmapOptions.radius = parseInt(this.value);
        document.getElementById('fixedRadiusValue').textContent = this.value;
        const selectedKey = document.getElementById('fixedDataSelect').value;
        const selectedData = jsonData[selectedKey];
        displayHeatmap(selectedData);
    });

    document.getElementById('fixedMaxZoomSlider').addEventListener('input', function() {
        heatmapOptions.maxZoom = parseInt(this.value);
        document.getElementById('fixedMaxZoomValue').textContent = this.value;
        const selectedKey = document.getElementById('fixedDataSelect').value;
        const selectedData = jsonData[selectedKey];
        displayHeatmap(selectedData);
    });

})();
