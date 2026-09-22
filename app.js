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
        id: "INC-001",
        title: "Bache frente a la universidad",
        category: "bache",
        description: "Bache profundo que dificulta el paso de vehiculos",
        status: "pendiente",
        latitude: 21.1248,
        longitude: -101.6812,
        createdAt: "2026-01-15"
    },
    {
        id: "INC-002",
        title: "se cayo la luz",
        category: "alumbrado",
        description: "se cayo doña luz",
        status: "pendiente",
        latitude: 21.1248,
        longitude: -101.6812,
        createdAt: "2026-01-15"
    },
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
        latitude: 21.1213,
        longitude: -101.6923,
        createdAt: "2026-01-19"
    },
    {
        id: "INC-006",
        title: "Obstrucción en la vía",
        category: "basura",
        description: "Se observa basura en la vía que dificulta el paso de vehículos",
        status: "pendiente",
        latitude: 21.1185,
        longitude: -101.6897,
        createdAt: "2026-01-15"
    },
    {
        id: "INC-007",
        title: "Fuga de agua en la calle principal",
        category: "fuga",
        description: "Se observa una fuga de agua en la calle principal que está afectando el tránsito vehicular",
        status: "pendiente",
        latitude: 21.1202,
        longitude: -101.6875,
        createdAt: "2026-01-16"
    },
    {
        id: "INC-008",
        title: "Alumbrado defectuoso",
        category: "alumbrado",
        description: "Alumbrado defectuoso en la calle principal",
        status: "pendiente",
        latitude: 21.1213,
        longitude: -101.6923,
        createdAt: "2026-01-19"
    },
    {
        id: "INC-009",
        title: "Bache en la avenida principal",
        category: "bache",
        description: "Bache en la avenida principal que dificulta el paso de vehículos",
        status: "pendiente",
        latitude: 21.1185,
        longitude: -101.6897,
        createdAt: "2026-01-15"
    },
    {
        id: "INC-010",
        title: "Basura acumulada en la calle secundaria",
        category: "basura",
        description: "Basura acumulada en la calle secundaria que está afectando el tránsito peatonal",
        status: "pendiente",
        latitude: 21.1202,
        longitude: -101.6875,
        createdAt: "2026-01-16"
    }
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
const statPending = document.getElementById("stat-pending");
const statResolved = document.getElementById("stat-resolved");

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
    showTemproraryMarker(latitude, longitude);
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
}