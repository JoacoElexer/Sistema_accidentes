"use strict";

// NOTA: coordenadas aproximadas [longitud, latitud]; verificar en un mapa antes de entregar.
const cameras = [
    {
        id: "CAM-001",
        name: "Cámara Plaza Principal",
        type: "ptz",
        status: "activa",
        description: "Vigilancia del centro histórico",
        rangeMeters: 300,
        location: {
            type: "Point",
            coordinates: [-101.681, 21.1222]
        },
        createdAt: "2026-10-10T12:00:00.000Z",
        updatedAt: "2026-10-10T12:00:00.000Z"
    },
    {
        id: "CAM-002",
        name: "Cámara Arco de la Calzada",
        type: "fija",
        status: "activa",
        description: "Vista del acceso al centro",
        rangeMeters: 120,
        location: {
            type: "Point",
            coordinates: [-101.674, 21.123]
        },
        createdAt: "2026-10-11T12:00:00.000Z",
        updatedAt: "2026-10-11T12:00:00.000Z"
    },
    {
        id: "CAM-003",
        name: "Cámara López Mateos y Hilario Medina",
        type: "lectora_placas",
        status: "activa",
        description: "Lectura de placas en cruce principal",
        rangeMeters: 80,
        location: {
            type: "Point",
            coordinates: [-101.6722, 21.1268]
        },
        createdAt: "2026-10-12T12:00:00.000Z",
        updatedAt: "2026-10-12T12:00:00.000Z"
    },
    {
        id: "CAM-004",
        name: "Cámara Forum Cultural",
        type: "fija",
        status: "mantenimiento",
        description: "Equipo en mantenimiento preventivo",
        rangeMeters: 150,
        location: {
            type: "Point",
            coordinates: [-101.6532, 21.129]
        },
        createdAt: "2026-10-13T12:00:00.000Z",
        updatedAt: "2026-10-13T12:00:00.000Z"
    },
    {
        id: "CAM-005",
        name: "Cámara Blvd. Aeropuerto y Delta",
        type: "lectora_placas",
        status: "falla",
        description: "Sin señal desde el último reporte",
        rangeMeters: 90,
        location: {
            type: "Point",
            coordinates: [-101.6615, 21.1405]
        },
        createdAt: "2026-10-14T12:00:00.000Z",
        updatedAt: "2026-10-14T12:00:00.000Z"
    },
    {
        id: "CAM-006",
        name: "Cámara Zona Piel",
        type: "ptz",
        status: "activa",
        description: "Monitoreo de zona comercial",
        rangeMeters: 250,
        location: {
            type: "Point",
            coordinates: [-101.6845, 21.12]
        },
        createdAt: "2026-10-15T12:00:00.000Z",
        updatedAt: "2026-10-15T12:00:00.000Z"
    },
    {
        id: "CAM-007",
        name: "Cámara Parque Explora",
        type: "fija",
        status: "activa",
        description: "Vigilancia de acceso al parque",
        rangeMeters: 100,
        location: {
            type: "Point",
            coordinates: [-101.678, 21.142]
        },
        createdAt: "2026-10-16T12:00:00.000Z",
        updatedAt: "2026-10-16T12:00:00.000Z"
    }
];

module.exports = cameras;
