"use strict";

// NOTA: coordenadas aproximadas [longitud, latitud]; verificar en un mapa antes de entregar.
const busStops = [
    {
        id: "BUS-001",
        name: "Terminal Delta",
        type: "troncal",
        status: "operando",
        description: "Terminal del sistema integrado de transporte",
        routesCount: 14,
        location: {
            type: "Point",
            coordinates: [-101.6597, 21.1415]
        },
        createdAt: "2026-10-10T12:00:00.000Z",
        updatedAt: "2026-10-10T12:00:00.000Z"
    },
    {
        id: "BUS-002",
        name: "Terminal Santa Rita",
        type: "troncal",
        status: "operando",
        description: "Terminal troncal zona poniente",
        routesCount: 12,
        location: {
            type: "Point",
            coordinates: [-101.708, 21.1465]
        },
        createdAt: "2026-10-11T12:00:00.000Z",
        updatedAt: "2026-10-11T12:00:00.000Z"
    },
    {
        id: "BUS-003",
        name: "Terminal San Jerónimo",
        type: "troncal",
        status: "operando",
        description: "Terminal troncal zona sur-poniente",
        routesCount: 10,
        location: {
            type: "Point",
            coordinates: [-101.6998, 21.1075]
        },
        createdAt: "2026-10-12T12:00:00.000Z",
        updatedAt: "2026-10-12T12:00:00.000Z"
    },
    {
        id: "BUS-004",
        name: "Terminal Select",
        type: "alimentadora",
        status: "suspendida",
        description: "Parada suspendida por obras",
        routesCount: 6,
        location: {
            type: "Point",
            coordinates: [-101.653, 21.117]
        },
        createdAt: "2026-10-13T12:00:00.000Z",
        updatedAt: "2026-10-13T12:00:00.000Z"
    },
    {
        id: "BUS-005",
        name: "Parada Blvd. López Mateos y Hilario Medina",
        type: "alimentadora",
        status: "operando",
        description: "Parada con alto flujo de usuarios",
        routesCount: 8,
        location: {
            type: "Point",
            coordinates: [-101.672, 21.127]
        },
        createdAt: "2026-10-14T12:00:00.000Z",
        updatedAt: "2026-10-14T12:00:00.000Z"
    },
    {
        id: "BUS-006",
        name: "Parada Centro Plaza Principal",
        type: "auxiliar",
        status: "operando",
        description: "Parada auxiliar en el centro histórico",
        routesCount: 4,
        location: {
            type: "Point",
            coordinates: [-101.6825, 21.122]
        },
        createdAt: "2026-10-15T12:00:00.000Z",
        updatedAt: "2026-10-15T12:00:00.000Z"
    },
    {
        id: "BUS-007",
        name: "Parada Blvd. Campestre",
        type: "auxiliar",
        status: "suspendida",
        description: "Servicio suspendido temporalmente",
        routesCount: 3,
        location: {
            type: "Point",
            coordinates: [-101.6905, 21.1445]
        },
        createdAt: "2026-10-16T12:00:00.000Z",
        updatedAt: "2026-10-16T12:00:00.000Z"
    }
];

module.exports = busStops;
