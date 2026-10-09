"use strict";

const incidents = [
    {
        id: "INC-001",
        title: "incendio en la vía pública",
        category: "accidente",
        description: "Bache profundo que dificulta el paso de vehiculos",
        status: "pendiente",
        location:{
            type:"Point",
            coordinates:[-101.6812, 21.1248]
        },
        createdAt: "2026-01-15T12:00:00.000Z",
        updatedAt: "2026-01-15T12:00:00.000Z"
    },
    {
        id: "INC-002",
        title: "Choque de autos",
        category: "accidente",
        description: "Choque de autos en la intersección de las calles 5 y 10",
        status: "resuelto",
        location:{
            type:"Point",
            coordinates:[-101.6820, 21.1250]
        },
        createdAt: "2026-01-16T12:00:00.000Z",
        updatedAt: "2026-01-16T12:00:00.000Z"
    },
    {
        id: "INC-003",
        title: "problemas con el alumbrado público",
        category: "alumbrado",
        description: "Falla en el sistema de alumbrado público en la calle principal",
        status: "pendiente",
        location:{
            type:"Point",
            coordinates:[-101.6830, 21.1260]
        },
        createdAt: "2026-01-17T12:00:00.000Z",
        updatedAt: "2026-01-17T12:00:00.000Z"
    },
    {
        id: "INC-004",
        title: "inundación en la zona baja",
        category: "inundación",
        description: "Inundación en la zona baja de la ciudad debido a lluvias intensas",
        status: "pendiente",
        location:{
            type:"Point",
            coordinates:[-101.6840, 21.1270]
        },
        createdAt: "2026-01-18T12:00:00.000Z",
        updatedAt: "2026-01-18T12:00:00.000Z"
    },
    {
        id: "INC-005",
        title: "accidente de tránsito",
        category: "accidente",
        description: "Accidente de tránsito en la intersección de las calles 3 y 7",
        status: "resuelto",
        location:{
            type:"Point",
            coordinates:[-101.6850, 21.1280]
        },
        createdAt: "2026-01-19T12:00:00.000Z",
        updatedAt: "2026-01-19T12:00:00.000Z"
    }
]