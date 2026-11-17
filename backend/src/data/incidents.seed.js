"use strict";


let incidents=[
    {
        id:"INC-001",
        title:"Bache frente a la universidad",
        category:"bache",
        description:"Bache profundo que dificulta el paso de vehiculos",
        status:"pendiente",
        location:{
            type:"Point",
            coordinates:[-101.6812,21.1248]
        },
        createdAt:"2026-01-15T12:00:00.000Z",
        updatedAt:"2026-01-16T12:00:00.000Z"
    },
    {
        id:"INC-002",
        title:"se cayo la luz",
        category:"alumbrado",
        description:"se cayo doña luz",
        status:"pendiente",
        location:{
            type:"Point",
            coordinates:[-101.6842,21.1278]
        },
        createdAt:"2026-01-15T12:00:00.000Z",
        updatedAt:"2026-01-16T12:00:00.000Z"
    },
    {
        id:"INC-003",
        title:"accidente jotas",
        category:"accidente",
        description:"me cai",
        status:"pendiente",
        location:{
            type:"Point",
            coordinates:[-101.6842,21.1218]
        },
        createdAt:"2026-03-28T12:00:00.000Z",
        updatedAt:"2026-03-29T12:00:00.000Z"
    },
    {
        id:"INC-004",
        title:"UN TEPOROCHO EN FRENTE DE la universidad",
        category:"basura",
        description:"se llama andres y esta enfrente de la salle",
        status:"pendiente",
        location:{
            type:"Point",
            coordinates:[-101.6782,21.1278]
        },
        createdAt:"2026-07-30T12:00:00.000Z",
        updatedAt:"2026-07-31T12:00:00.000Z"
    },
    {
        id:"INC-005",
        title:"lo que tu gustes",
        category:"fuga",
        description:"no sirvio el poster para tapar la cañeria",
        status:"pendiente",
        location:{
            type:"Point",
            coordinates:[-101.6743,21.1280]
        },
        createdAt:"2026-07-30T12:00:00.000Z",
        updatedAt:"2026-07-31T12:00:00.000Z"
    },
];

module.exports = incidents;