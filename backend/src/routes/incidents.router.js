"use strict";

const { Router } = require("express");
const incidentsService = require("../services/incidents.service");
const validateIncident = require("../middlewares/incident.validator");
const validateResource = require("../middlewares/resource.validator");

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

router.post(
    "/",
    validateResource("incident"),
    (req, res) => {
        const data = incidentsService.create(req.body);

        res.status(201).json({
            success: true,
            data,
        });
    }
);


router.patch(
    "/:id",
    validateResource("incident", "update"),
    (req, res) => {
        const data = incidentsService.update(req.params.id, req.body);

        res.json({
            success: true,
            message: "Incidente actualizado correctamente",
            data,
        });
    }
);

router.delete("/:id", async (req, res) => {
    const data = await incidentsService.delete(req.params.id);

    res.json({
        success: true,
        message: "Incidente eliminado correctamente",
        data
    });
});


module.exports = router;
