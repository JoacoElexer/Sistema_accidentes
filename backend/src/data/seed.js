"use strict";

require("dotenv").config();

const{
    connectDatabase,
    disconnectDatabase
}= require("../config/database")

const IncidentModel = require("../models/incident.model");
const seedIncidents = require("./incidents.seed");

async function runSeed() {
    try{
        await connectDatabase();
        await IncidentModel.deleteMany({})

        //2.- Quitar id CreatedAt y UpdatedAt los genera MongoDB
        const documents = seedIncidents.map(({id, createdAt, updatedAt, ...incident}) => incident);

        //3.- Insertar todos los datos de una sola vez
        const inserted = await IncidentModel.insertMany(documents);
        
        console.log (`Se insertaron ${inserted.length} incidentes en la base de datos`);
    }catch(error){
        console.log("Error al cargar los datos:", error.message);
        process.exitCode =1;
    }finally{
        await disconnectDatabase();
    }
}

runSeed();