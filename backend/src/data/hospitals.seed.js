"use strict";

// NOTA: coordenadas aproximadas [longitud, latitud]; verificar en un mapa antes de entregar.
const hospitals = [
    {
        id: "HOS-001",
        name: "Hospital Aranda de la Parra",
        type: "hospital",
        status: "operando",
        description: "Hospital privado en la zona Centro",
        beds: 120,
        location: {
            type: "Point",
            coordinates: [-101.6853, 21.1236]
        },
        createdAt: "2026-10-10T12:00:00.000Z",
        updatedAt: "2026-10-10T12:00:00.000Z"
    },
    {
        id: "HOS-002",
        name: "Hospital Ángeles León",
        type: "hospital",
        status: "saturado",
        description: "Hospital privado de especialidades sobre Blvd. Cerro Gordo",
        beds: 180,
        location: {
            type: "Point",
            coordinates: [-101.6475, 21.1397]
        },
        createdAt: "2026-10-11T12:00:00.000Z",
        updatedAt: "2026-10-11T12:00:00.000Z"
    },
    {
        id: "HOS-003",
        name: "Hospital Regional de Alta Especialidad del Bajío",
        type: "hospital",
        status: "operando",
        description: "Hospital público de alta especialidad",
        beds: 184,
        location: {
            type: "Point",
            coordinates: [-101.6217, 21.1027]
        },
        createdAt: "2026-10-12T12:00:00.000Z",
        updatedAt: "2026-10-12T12:00:00.000Z"
    },
    {
        id: "HOS-004",
        name: "Hospital General de León",
        type: "hospital",
        status: "saturado",
        description: "Hospital de la Secretaría de Salud de Guanajuato",
        beds: 250,
        location: {
            type: "Point",
            coordinates: [-101.6486, 21.0845]
        },
        createdAt: "2026-10-13T12:00:00.000Z",
        updatedAt: "2026-10-13T12:00:00.000Z"
    },
    {
        id: "HOS-005",
        name: "Cruz Roja Mexicana Delegación León",
        type: "cruz_roja",
        status: "operando",
        description: "Puesto de socorro y atención de urgencias",
        beds: 25,
        location: {
            type: "Point",
            coordinates: [-101.6895, 21.1298]
        },
        createdAt: "2026-10-14T12:00:00.000Z",
        updatedAt: "2026-10-14T12:00:00.000Z"
    },
    {
        id: "HOS-006",
        name: "Clínica IMSS HGZ 21",
        type: "clinica",
        status: "operando",
        description: "Hospital General de Zona del IMSS",
        beds: 200,
        location: {
            type: "Point",
            coordinates: [-101.6791, 21.1349]
        },
        createdAt: "2026-10-15T12:00:00.000Z",
        updatedAt: "2026-10-15T12:00:00.000Z"
    },
    {
        id: "HOS-007",
        name: "Hospital Médica Campestre",
        type: "hospital",
        status: "cerrado",
        description: "Hospital privado en la zona Campestre (cerrado por mantenimiento)",
        beds: 90,
        location: {
            type: "Point",
            coordinates: [-101.6962, 21.1486]
        },
        createdAt: "2026-10-16T12:00:00.000Z",
        updatedAt: "2026-10-16T12:00:00.000Z"
    }
];

module.exports = hospitals;
