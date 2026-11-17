"use strict";

const { Router } = require("express");
const incidentsRouter = require("./incidents.router");
const hospitalsRouter = require("./hospitals.router");
const stationsRouter = require("./stations.router");
const busStopsRouter = require("./bus-stops.router");
const camerasRouter = require("./cameras.router");

function routerApi(app) {
    const apiRouter = Router();

    app.use("/api", apiRouter);
    
    apiRouter.use("/incidents", incidentsRouter);
    apiRouter.use("/hospitals", hospitalsRouter);
    apiRouter.use("/stations", stationsRouter);
    apiRouter.use("/bus-stops", busStopsRouter);
    apiRouter.use("/cameras", camerasRouter);

}

module.exports = routerApi;