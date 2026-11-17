"use strict";

const mongoose = require("mongoose");

async function connectDatabase() {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        throw new Error("Falta la variable MONGO_URI en el archivo .env");
    }

    await mongoose.connect(uri);

    console.log(`MongoDB conectado a la base: ${mongoose.connection.name}`);

}
async function disconnectDatabase() {
    await mongoose.disconnect();
}


module.exports = {
    connectDatabase,
    disconnectDatabase
}