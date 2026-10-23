"use strict";

const { Router } = require("express");
const incidentsService = require("../services/incidents.service");
const validateIncident = require("../middlewares/incident.validator");

const router = Router();

const getFilters = (query) => ({
    search: query.search,
    category: query.category,
    status: query.status,
});

router.get("/", async (req, res) => {
    const data = await incidentsService.getAll(getFilters(req.query));
    res.json({ success: true, total: data.length, data });
});

router.get("/geojson", async (req, res) => {
    res.json(await incidentsService.getGeoJSON(getFilters(req.query)));
});

router.get("/:id", (req, res) => {
    res.json({ success: true, data: incidentsService.getById(req.params.id) });
});

router.post("/", validateIncident, (req, res) => {
    res.status(201).json({ success: true, data: incidentsService.create(req.body) });
});

module.exports = router;
