"use strict";

// NOTA: coordenadas aproximadas [longitud, latitud]; verificar en un mapa antes de entregar.
const stations = [
    {
        id: "STA-001",
        name: "Bomberos León Estación Central",
        type: "bomberos",
        status: "activa",
        description: "Estación principal de bomberos",
        units: 12,
        location: {
            type: "Point",
            coordinates: [-101.6836, 21.1262]
        },
        createdAt: "2026-10-10T12:00:00.000Z",
        updatedAt: "2026-10-10T12:00:00.000Z"
    },
    {
        id: "STA-002",
        name: "Bomberos Estación Norte",
        type: "bomberos",
        status: "activa",
        description: "Cobertura de la zona norte de la ciudad",
        units: 8,
        location: {
            type: "Point",
            coordinates: [-101.6788, 21.1623]
        },
        createdAt: "2026-10-11T12:00:00.000Z",
        updatedAt: "2026-10-11T12:00:00.000Z"
    },
    {
        id: "STA-003",
        name: "Bomberos Estación Sur",
        type: "bomberos",
        status: "inactiva",
        description: "Estación en remodelación",
        units: 6,
        location: {
            type: "Point",
            coordinates: [-101.667, 21.0905]
        },
        createdAt: "2026-10-12T12:00:00.000Z",
        updatedAt: "2026-10-12T12:00:00.000Z"
    },
    {
        id: "STA-004",
        name: "Seguridad Pública Municipal",
        type: "policia",
        status: "activa",
        description: "Base de patrullas de la policía municipal",
        units: 45,
        location: {
            type: "Point",
            coordinates: [-101.664, 21.132]
        },
        createdAt: "2026-10-13T12:00:00.000Z",
        updatedAt: "2026-10-13T12:00:00.000Z"
    },
    {
        id: "STA-005",
        name: "Policía Estación Poniente",
        type: "policia",
        status: "activa",
        description: "Módulo de vigilancia zona poniente",
        units: 20,
        location: {
            type: "Point",
            coordinates: [-101.7203, 21.1245]
        },
        createdAt: "2026-10-14T12:00:00.000Z",
        updatedAt: "2026-10-14T12:00:00.000Z"
    },
    {
        id: "STA-006",
        name: "Protección Civil Municipal",
        type: "proteccion_civil",
        status: "activa",
        description: "Atención de contingencias y simulacros",
        units: 15,
        location: {
            type: "Point",
            coordinates: [-101.6759, 21.1178]
        },
        createdAt: "2026-10-15T12:00:00.000Z",
        updatedAt: "2026-10-15T12:00:00.000Z"
    },
    {
        id: "STA-007",
        name: "Protección Civil Zona Oriente",
        type: "proteccion_civil",
        status: "inactiva",
        description: "Base temporalmente sin operación",
        units: 5,
        location: {
            type: "Point",
            coordinates: [-101.651, 21.1095]
        },
        createdAt: "2026-10-16T12:00:00.000Z",
        updatedAt: "2026-10-16T12:00:00.000Z"
    }
];

module.exports = stations;
