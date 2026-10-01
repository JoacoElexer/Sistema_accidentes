"use strict";

//Configuración inicial 
const INITIL_CENTER = [21.122, -101.686];
const INITIL_ZOOM = 13;

const CATEGORY_CONFIG = {
    bache: {
        label: "Bache",
        color: "#d92d20"
    },
    alumbrado: {
        label: "Alumbrado",
        color: "#f79009"
    },
    basura: {
        label: "Basura",
        color: "#667085"

    },
    fuga: {
        label: "Fuga de Agua",
        color: "#1570ef"
    },
    accidente: {
        label: "Accidente",
        color: "#7a5af8"
    }
}

//Creacion de rrgwlo de inicidentes

let incidents = [

    {
        id: "INC-003",
        title: "accidente jotas",
        category: "accidente",
        description: "Bache profundo que dificulta el paso de vehiculos",
        status: "pendiente",
        latitude: 21.1248,
        longitude: -101.6812,
        createdAt: "2026-01-15"
    },
    {
        id: "INC-004",
        title: "Fuga en tuberia principal",
        category: "fuga",
        description: "Se observa una corriente de agua",
        status: "pendiente",
        latitude: 21.1158,
        longitude: -101.6754,
        createdAt: "2026-01-18"
    },
    {
        id: "INC-005",
        title: "Accidente Vehicular",
        category: "accidente",
        description: "Choque menor, se recomienda circular con protección",
        status: "atendido",
        latitude: 21.1379,
        longitude: -101.6867,
        createdAt: "2026-01-19"
    },
    {
        id: "INC-006",
        title: "Obstrucción en la vía",
        category: "basura",
        description: "Se observa basura en la vía que dificulta el paso de vehículos",
        status: "pendiente",
        latitude: 21.1480,
        longitude: -101.6590,
        createdAt: "2026-01-15"
    },
    {
        id: "INC-007",
        title: "Fuga de agua en la calle principal",
        category: "fuga",
        description: "Se observa una fuga de agua en la calle principal que está afectando el tránsito vehicular",
        status: "pendiente",
        latitude: 21.1168,
        longitude: -101.6588,
        createdAt: "2026-01-16"
    },
    {
        id: "INC-008",
        title: "Alumbrado defectuoso",
        category: "alumbrado",
        description: "Alumbrado defectuoso en la calle principal",
        status: "pendiente",
        latitude: 21.1188,
        longitude: -101.7076,
        createdAt: "2026-01-19"
    },
  
]

const incidentForm = document.getElementById("incident-form");
const incidentIdInput = document.getElementById("incident-id");
const titleInput = document.getElementById("title-input");
const categoryInput = document.getElementById("category-input");
const descriptionInput = document.getElementById("description-input");
const statusInput = document.getElementById("status-input");
const latitudeInput = document.getElementById("latitude-input");
const longitudeInput = document.getElementById("longitude-input");

const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const statusFilter = document.getElementById("status-filter");

const incidentList = document.getElementById("incident-list");
const emptyMessage = document.getElementById("empty-message");
const resultsCounter = document.getElementById("results-counter");

const statTotal = document.getElementById("stat-total");
statTotal.textContent = incidents.length;
const statPending = document.getElementById("stat-pending");
statPending.textContent = incidents.filter(incident => incident.status === "pendiente").length;
const statResolved = document.getElementById("stat-resolved");
statResolved.textContent = incidents.filter(incident => incident.status === "atendido").length;

const formTitle = document.getElementById("form-title");
const formModeBadge = document.getElementById("form-mode-badge");
const formMessage = document.getElementById("form-message");
const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");

const fitMapButton = document.getElementById("btn-fit-map");
const coordinateIndicator = document.getElementById("coordinate-indicator");

// Inicialización del mapa
const map = L.map("map", {
    center: INITIL_CENTER,
    zoom: INITIL_ZOOM,
    zoomControl: true
});

// Inicializar capa base
const streetLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
);

const humanitarianLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        attribution:
            '&copy; OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team'
    }
);

streetLayer.addTo(map);
humanitarianLayer.addTo(map);

// Gestionar grupos de capas

const incidentsLayer = L.layerGroup().addTo(map);
const selectionLayer = L.layerGroup().addTo(map);

const baseLayers = {
    "Mapa de Calles": streetLayer,
    "Mapa Humanitario": humanitarianLayer
};

const overlays = {
    "Incidentes urbanos": incidentsLayer,
    "Seleccion temporal": selectionLayer
};

L.control.layers(baseLayers, overlays, {
    collapsed: false,
    position: "topright"
}).addTo(map);

L.control.scale({
    collapsed: false,
    position: "bottomright"
}).addTo(map);

//Leyenda
const legend = L.control({
    position: "bottomleft"
});

legend.onAdd = function () {
    const container = L.DomUtil.create("div", "map-legend");
    let content = "<h4>Categorías</h4>";
    Object.entries(CATEGORY_CONFIG).forEach(([key, config]) => {
        content += `
        <div class = "legend-item">
            <span
            class = "legend-color"
            style = "background:${config.color}">
            </span>
            <span>${config.label}</span>
        </div>
        `;
    });
    container.innerHTML = content;
    return container;
}

legend.addTo(map);

//Crear evento de clic en el mapa
map.on("click", function (event) {
    const latitude = Number(event.latlng.lat.toFixed(6));
    const longitude = Number(event.latlng.lng.toFixed(6));

    latitudeInput.value = latitude;
    longitudeInput.value = longitude;

    coordinateIndicator.textContent =
        `Coordenadas seleccionadas: ${latitude}, ${longitude}`;
        showTemporaryMarker(latitude, longitude);
})

function showTemporaryMarker(latitude, longitude) {
    selectionLayer.clearLayers();
    const temporaryMarker = L.marker(
        [latitude, longitude],
        {
            draggable: true,
        }
    );
    temporaryMarker
        .bindPopup(
            `<strong>Ubicación Seleccionada</strong>
            <br>
            Puedes arrastrar este marcador para ajustar la posición.
            `
        )
        .addTo(selectionLayer)
        .openPopup();

    temporaryMarker.on("dragend", function(event){
        const position = event.target.getLatLng();
        const newLatitude = Number(position.lat.toFixed(6));
        const newLongitude = Number(position.lng.toFixed(6));

        latitudeInput.value = newLatitude;
        longitudeInput.value = newLongitude;

        coordinateIndicator.textContent =
        `Coordenadas ajustadas: ${newLatitude}, ${newLongitude}`;
    });
}

function mostrarIncidentes() {
    incidents.forEach(function (incident) {
        const categoryConfig = CATEGORY_CONFIG[incident.category];
        const marker = L.circleMarker(
            [incident.latitude, incident.longitude],
            {
                radius: 9,
                color: categoryConfig.color,
                fillColor: categoryConfig.color,
                fillOpacity: 0.7
            }
        );
        const actions = document.createElement("div");
        const editButton = document.createElement("button");
        editButton.type= "button";
        editButton.className = "popup button-primary button-small";
        editButton.textContent = "Editar";
        editButton.addEventListener("click", function(){
            startEditingIncident(incident.id);
            map.closePopup();
        });
        actions.className = "popup-actions";
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "popup button-danger button-small";
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", function(){
            deleteIncident(incident.id);
            map.closePopup();
        });
        actions.append(editButton, deleteButton);
        marker
            .bindTooltip(incident.title)
            .bindPopup(`
                <strong>Id:</strong> ${incident.id}<br>
                <strong>Nombre:</strong> ${incident.title}<br>
                <strong>Categoría:</strong> ${categoryConfig.label}<br>
                <strong>Estado:</strong> ${incident.status}<br>
                <strong>Descripción:</strong> ${incident.description}<br>
                <strong class="coordinates-text">Coordenadas:</strong> ${incident.latitude}, ${incident.longitude}
                <br><br>
                ${actions.innerHTML}
            `);
        incidentsLayer.addLayer(marker);
        console.log("Incidente con coordenadas: ", incident.latitude,", ", incident.longitude," creado.");
        console.log("Id de incidente: ",incident.id);
    });
}

function getFilteredIncidents(){
    const searchText = normalizeText(searchInput.value);
    const selectedCategory = categoryFilter.value;
    const selectedStatus = statusFilter.value;

    return incidents.filter(function(incident){
        const searchableText = normalizeText(
            `${incident.title} ${incident.description} ${incident.category}`
        );

        const matchesSearch = 
            searchableText.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            incident.category === selectedCategory;

        const matchesStatus = 
            selectedStatus === "all" ||
            incident.status === selectedStatus

        return(
            matchesSearch &&
            matchesCategory  &&
            matchesStatus
        );
    });
};

function normalizeText(value){
    return String(value)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"")
        .trim();
}

function renderApplication(){
    const filteredIncidents = getFilteredIncidents();

    renderMapIncidents(filteredIncidents);
    renderIncidentsList(filteredIncidents);
    renderStatistics();
    updateResultsCounter(filteredIncidents.length);
}

function renderMapIncidents(data){
    incidentsLayer.clearLayers();

    data.forEach(function(incident){
        const category = CATEGORY_CONFIG[incident.category];

        const point = L.circleMarker(
            [incident.latitude, incident.longitude],
            {
                radius: 9,
                color : "#ffffff",
                weight : 2,
                fillColor: category.color,
                fillOpacity: 0.95
            }
        );

        point.bindTooltip(
            incident.title,
            {
                direction: "top",
                offset: [0, -8]
            }
        );

        point.bindPopup(
            createPopup(incident),
            {
                maxWidth: 280
            }
        );

        point.addTo(incidentsLayer);
    });
}

function renderIncidentsList(data){
    incidentList.innerHTML = "";
    emptyMessage.hidden = data.length !== 0;
    data.forEach(function(incident){
        const category = CATEGORY_CONFIG[incident.category];
        const card = document.createElement("div");
        card.className = "incident-card";
        card.style.setProperty(
            "--incident-color",
            category.color
        );
        const header = document.createElement("div");
        header.className = "incident-card-header";
        const title = document.createElement("h3");
        title.textContent = incident.title;
        const statusBadge = document.createElement("span");
        statusBadge.className = incident.status ==="pendiente"
            ? "badge badge-pending"
            : "badge badge-resolved";
        statusBadge.textContent = formatStatus(incident.status);
        header.append(title, statusBadge);
        const description = document.createElement("p");
        description.className = "incident-description";
        description.textContent = incident.description;
        const meta = document.createElement("div");
        meta.className = "incident-meta";
        const categoryBadge = document.createElement("span");
        categoryBadge.className = "badge badge-category";
        categoryBadge.textContent = category.label;
        const coordinates = document.createElement("span");
        coordinates.className = "coordinates-text";
        coordinates.textContent = `
            ${incident.latitude}, ${incident.longitude}
        `;
        meta.append(categoryBadge, coordinates);
        const actions = document.createElement("div");
        actions.className = "incident-actions";
        const localButton = createActionButton(
            "Ver en mapa",
            "button button-secondary button-small",
            function(){
                focusIncident(incident)
            }
        );

        const editButton = createActionButton(
            "Editar",
            "button button-primary button-small",
            function(){
                startEditingIncident(incident.id);
            }
        );
        const deleteButton = createActionButton(
            "Eliminar",
            "button button-danger button-small",
            function(){
                deleteIncident(incident.id);
            }
        );
        actions.append(localButton, editButton, deleteButton);
        card.append(header, description, meta, actions);
        incidentList.appendChild(card);
    });
}

mostrarIncidentes();