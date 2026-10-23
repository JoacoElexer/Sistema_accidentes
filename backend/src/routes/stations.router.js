"use strict";

const { Router } = require("express");
const stationsService = require("../services/stations.service");

const router = Router();

const getFilters = (query) => ({
    search: query.search,
    type: query.type,
    status: query.status,
});

router.get("/", async (req, res) => {
    const data = await stationsService.getAll(getFilters(req.query));
    res.json({ success: true, total: data.length, data });
});

// Debe ir antes de /:id, si no "geojson" se interpreta como un id
router.get("/geojson", async (req, res) => {
    res.json(await stationsService.getGeoJSON(getFilters(req.query)));
});

router.get("/:id", (req, res) => {
    res.json({ success: true, data: stationsService.getById(req.params.id) });
});


router.post("/", (req, res) => {
    const {
        name,
        type,
        status,
        description,
        units,
        location
    } = req.body ?? {};

    if (
        typeof name !== "string" || !name.trim() ||
        typeof type !== "string" || !type.trim() ||
        typeof status !== "string" || !status.trim() ||
        typeof description !== "string" || !description.trim() ||
        !Number.isInteger(units) || units < 0
    ) {
        return res.status(400).json({
            success: false,
            message: "Datos de estación inválidos"
        });
    }

    const data = stationsService.create({
        name: name.trim(),
        type,
        status,
        description: description.trim(),
        units,
        location
    });

    res.status(201).json({ success: true, data });
});


module.exports = router;
