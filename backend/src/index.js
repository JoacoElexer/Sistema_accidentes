"use strict";

const app = require("./app");
const {
    connectDatabase,
    disconnectDatabase
} = require("./config/database")

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectDatabase();
        app.listen(PORT, () => {
            console.log("Servidor corriendo en el puerto " + PORT);
            console.log("localhost: http://localhost:" + PORT + "/api/incidents");
            console.log("localhost: http://localhost:" + PORT + "/api/health");
            console.log("=========================================");
        });

        function shutdown(signal) {
            console.log(`\nSe recibió ${signal}. Cerrando servidor...`);
            disconnectDatabase();
            server.close(() => {
                console.log("Servidor cerrado correctamente.");
                process.exit(0);
            });
        }

        process.on("SIGINT", () => shutdown("SIGINT"));
        process.on("SIGTERM", () => shutdown("SIGTERM"));
    } catch (error) {
        console.error("No se pudo conectar a MongoDB:", error.message);
        process.exit(1);
    }
}


startServer();