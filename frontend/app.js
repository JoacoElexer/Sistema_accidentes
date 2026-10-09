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
        title: "incendio en la vía pública",
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

const incidentList = document.getElementById("incidents-list");
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
        <div class="legend-item">
            <span
            class="legend-color"
            style="background-color:${config.color}">
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

function getFilteredIncidents() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const categoryValue = categoryFilter.value;
    const statusValue = statusFilter.value;

    return incidents.filter(function (incident) {
        const matchesCategory = categoryValue === "all" || incident.category === categoryValue;
        const matchesStatus = statusValue === "all" || incident.status === statusValue;
        const matchesSearch = searchTerm === "" ||
            incident.title.toLowerCase().includes(searchTerm) ||
            incident.description.toLowerCase().includes(searchTerm) ||
            incident.category.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesStatus && matchesSearch;
    });
}

function renderStats() {
    statTotal.textContent = incidents.length;
    statPending.textContent = incidents.filter(incident => incident.status === "pendiente").length;
    statResolved.textContent = incidents.filter(incident => incident.status === "atendido").length;
}

function renderList(filtered) {
    const list = filtered || getFilteredIncidents();
    incidentList.innerHTML = "";

    resultsCounter.textContent = `${list.length} resultado${list.length === 1 ? "" : "s"}`;
    emptyMessage.hidden = list.length !== 0;

    list.forEach(function (incident) {
        const categoryConfig = CATEGORY_CONFIG[incident.category] || { label: incident.category, color: "#667085" };
        const card = document.createElement("article");
        card.className = "incident-card";
        card.style.borderLeftColor = categoryConfig.color;
        card.innerHTML = `
            <div class="incidents-card-header">
                <h3>${escapeHtml(incident.title)}</h3>
                <span class="badge ${incident.status === "pendiente" ? "badge-pending" : "badge-resolved"}">${escapeHtml(formatStatus(incident.status))}</span>
            </div>
            <p class="incidents-description">${escapeHtml(incident.description)}</p>
            <div class="incidents-meta">
                <span class="badge badge-category">${escapeHtml(categoryConfig.label)}</span>
                <span class="coordinates-text">${incident.latitude}, ${incident.longitude}</span>
            </div>
            <div class="incident-actions">
                <button type="button" class="button button-secondary button-small" data-action="edit" data-id="${incident.id}">Editar</button>
                <button type="button" class="button button-danger button-small" data-action="delete" data-id="${incident.id}">Eliminar</button>
            </div>
        `;
        incidentList.appendChild(card);
    });
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function renderMarkers(filtered) {
    const list = filtered || getFilteredIncidents();
    incidentsLayer.clearLayers();
    list.forEach(function (incident) {
        const categoryConfig = CATEGORY_CONFIG[incident.category] || { label: incident.category, color: "#667085" };
        const marker = L.circleMarker(
            [incident.latitude, incident.longitude],
            {
                radius: 9,
                color: categoryConfig.color,
                fillColor: categoryConfig.color,
                fillOpacity: 0.7,
                bubblingMouseEvents: false
            }
        );
        const popupContainer = document.createElement("div");
        popupContainer.className = "popup-content";
        popupContainer.innerHTML = `
                <h3>${escapeHtml(incident.title)}</h3>
                <p><strong>Id:</strong> ${escapeHtml(incident.id)}</p>
                <p><strong>Categoría:</strong> ${escapeHtml(categoryConfig.label)}</p>
                <p><strong>Estado:</strong> ${escapeHtml(formatStatus(incident.status))}</p>
                <p><strong>Descripción:</strong> ${escapeHtml(incident.description)}</p>
                <p class="coordinates-text"><strong>Coordenadas:</strong> ${incident.latitude}, ${incident.longitude}</p>
                <div class="popup-actions">
                    <button type="button" class="button button-secondary button-small" data-action="edit">Editar</button>
                    <button type="button" class="button button-danger button-small" data-action="delete">Eliminar</button>
                </div>
            `;
        popupContainer.querySelector('[data-action="edit"]').addEventListener("click", function () {
            map.closePopup();
            startEditingIncident(incident.id);
        });
        popupContainer.querySelector('[data-action="delete"]').addEventListener("click", function () {
            map.closePopup();
            deleteIncident(incident.id);
        });
        marker
            .bindTooltip(incident.title)
            .bindPopup(popupContainer);
        incidentsLayer.addLayer(marker);
    });
}

function renderApp() {
    const filtered = getFilteredIncidents();
    renderStats();
    renderList(filtered);
    renderMarkers(filtered);
}

function mostrarIncidentes() {
    renderApp();
}

function centerMapOnIncident(latitude, longitude) {
    map.setView([latitude, longitude], 16);
}

function createIncident(data) {
    const newIncident = {
        id: generateIncidentId(),
        title: data.title,
        category: data.category,
        description: data.description,
        status: data.status,
        latitude: data.latitude,
        longitude: data.longitude,
        createdAt: getCurrentDate()
    };

    incidents.push(newIncident);
    renderApp();
    resetForm();
    showFormMessage("Incidente registrado exitosamente.", "success");
    centerMapOnIncident(newIncident.latitude, newIncident.longitude);
    return newIncident;
}

function generateIncidentId() {
    const timePart = Date.now().toString(16).toUpperCase().slice(-8).padStart(8, "0");
    const randomPart = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
    return `INC-${timePart}-${randomPart}`;
}

function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function startEditingIncident(id) {
    const incident = incidents.find(incident => incident.id === id);
    if (!incident) {
        showFormMessage("No se encontró el incidente.", "error");
        return null;
    }
    incidentIdInput.value = incident.id;
    titleInput.value = incident.title;
    categoryInput.value = incident.category;
    descriptionInput.value = incident.description;
    statusInput.value = incident.status;
    latitudeInput.value = incident.latitude;
    longitudeInput.value = incident.longitude;

    formTitle.textContent = "Editar incidente";
    formModeBadge.textContent = "Editando";
    formModeBadge.classList.add("editing");
    saveButton.textContent = "Actualizar incidente";
    cancelButton.hidden = false;

    coordinateIndicator.textContent =
        `Editando ubicación: ${incident.latitude}, ${incident.longitude}`;
    showTemporaryMarker(incident.latitude, incident.longitude);
    centerMapOnIncident(incident.latitude, incident.longitude);
    incidentForm.scrollIntoView({ behavior: "smooth", block: "start" });
    return incident;
}

function updateIncident(id, changes) {
    const incident = incidents.find(incident => incident.id === id);
    if (!incident) {
        showFormMessage("No se encontró el incidente a actualizar.", "error");
        return null;
    }
    Object.assign(incident, changes);
    renderApp();
    resetForm();
    showFormMessage("Incidente actualizado exitosamente.", "success");
    centerMapOnIncident(incident.latitude, incident.longitude);
    return incident;
}

function deleteIncident(id) {
    const incident = incidents.find(incident => incident.id === id);
    if (!incident) {
        showFormMessage("No se encontró el incidente a eliminar.", "error");
        return false;
    }
    const confirmed = confirm(`¿Eliminar el incidente "${incident.title}" (${incident.id})?`);
    if (!confirmed) {
        return false;
    }
    incidents = incidents.filter(item => item.id !== id);
    if (incidentIdInput.value === id) {
        resetForm();
    }
    renderApp();
    showFormMessage("Incidente eliminado correctamente.", "success");
    return true;
}

let formMessageTimeout = null;

function resetForm() {
    incidentForm.reset();
    incidentIdInput.value = "";
    formTitle.textContent = "Registrar incidente";
    formModeBadge.textContent = "Nuevo";
    formModeBadge.classList.remove("editing");
    saveButton.textContent = "Guardar incidente";
    cancelButton.hidden = true;
    selectionLayer.clearLayers();
    coordinateIndicator.textContent = "Haz click en el mapa para seleccionar las coordenadas";
    hideFormMessage();
}

function showFormMessage(message, type) {
    const messageType = type || "success";
    formMessage.textContent = message;
    formMessage.className = `form-message ${messageType}`;
    formMessage.hidden = false;
    if (formMessageTimeout) {
        clearTimeout(formMessageTimeout);
    }
    formMessageTimeout = setTimeout(hideFormMessage, 4000);
}

function hideFormMessage() {
    formMessage.hidden = true;
    formMessage.textContent = "";
    formMessage.className = "form-message";
}

function formatStatus(status) {
    if (status === "pendiente") {
        return "Pendiente";
    } else if (status === "atendido") {
        return "Atendido";
    }
    return status;
}

incidentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const data = {
        title: titleInput.value.trim(),
        category: categoryInput.value,
        description: descriptionInput.value.trim(),
        status: statusInput.value,
        latitude: parseFloat(latitudeInput.value),
        longitude: parseFloat(longitudeInput.value)
    };

    if (!data.title || !data.category || !data.description ||
        Number.isNaN(data.latitude) || Number.isNaN(data.longitude)) {
        showFormMessage("Completa todos los campos y selecciona una ubicación en el mapa.", "error");
        return;
    }

    const editingId = incidentIdInput.value;
    if (editingId) {
        updateIncident(editingId, data);
    } else {
        createIncident(data);
    }
});

cancelButton.addEventListener("click", function () {
    resetForm();
});

incidentList.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-action]");
    if (!button) {
        return;
    }
    const id = button.getAttribute("data-id");
    if (button.getAttribute("data-action") === "edit") {
        startEditingIncident(id);
    } else if (button.getAttribute("data-action") === "delete") {
        deleteIncident(id);
    }
});

searchInput.addEventListener("input", renderApp);
categoryFilter.addEventListener("change", renderApp);
statusFilter.addEventListener("change", renderApp);

fitMapButton.addEventListener("click", function () {
    if (incidents.length === 0) {
        map.setView(INITIL_CENTER, INITIL_ZOOM);
        return;
    }
    const bounds = L.latLngBounds(incidents.map(incident => [incident.latitude, incident.longitude]));
    map.fitBounds(bounds.pad(0.2));
});


mostrarIncidentes();
resetForm(); 