"use strict";

const { Router } = require("express");
const hospitalsService = require("../services/hospitals.service");

const router = Router();

const getFilters = (query) => ({
    search: query.search,
    type: query.type,
    status: query.status,
});

router.get("/", async (req, res) => {
    const data = await hospitalsService.getAll(getFilters(req.query));
    res.json({ success: true, total: data.length, data });
});

// Debe ir antes de /:id, si no "geojson" se interpreta como un id
router.get("/geojson", async (req, res) => {
    res.json(await hospitalsService.getGeoJSON(getFilters(req.query)));
});

router.get("/:id", (req, res) => {
    res.json({ success: true, data: hospitalsService.getById(req.params.id) });
});


router.post("/", (req, res) => {
    const {
        name,
        type,
        status,
        description,
        beds,
        location
    } = req.body ?? {};

    if (
        typeof name !== "string" || !name.trim() ||
        typeof type !== "string" || !type.trim() ||
        typeof status !== "string" || !status.trim() ||
        typeof description !== "string" || !description.trim() ||
        !Number.isInteger(beds) || beds < 0
    ) {
        return res.status(400).json({
            success: false,
            message: "Datos de hospital inválidos"
        });
    }

    const data = hospitalsService.create({
        name: name.trim(),
        type,
        status,
        description: description.trim(),
        beds,
        location
    });

    res.status(201).json({ success: true, data });
});


module.exports = router;
