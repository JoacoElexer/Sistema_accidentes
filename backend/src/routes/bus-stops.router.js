"use strict";

const { Router } = require("express");
const busStopsService = require("../services/bus-stops.service");
const validateResource = require("../middlewares/resource.validator");

const router = Router();

const getFilters = (query) => ({
    search: query.search,
    type: query.type,
    status: query.status,
});

router.get("/", async (req, res) => {
    const data = await busStopsService.getAll(getFilters(req.query));
    res.json({ success: true, total: data.length, data });
});

// Debe ir antes de /:id, si no "geojson" se interpreta como un id
router.get("/geojson", async (req, res) => {
    res.json(await busStopsService.getGeoJSON(getFilters(req.query)));
});

router.get("/:id", (req, res) => {
    res.json({ success: true, data: busStopsService.getById(req.params.id) });
});


router.post("/", (req, res, next) => {
    try {
        const {
            name,
            type,
            status,
            description,
            routesCount,
            location
        } = req.body ?? {};

        if (
            typeof name !== "string" || !name.trim() ||
            typeof type !== "string" || !type.trim() ||
            typeof status !== "string" || !status.trim() ||
            typeof description !== "string" || !description.trim() ||
            !Number.isInteger(routesCount) || routesCount < 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Datos de parada inválidos"
            });
        }

        const data = busStopsService.create({
            name,
            type,
            status,
            description,
            routesCount,
            location
        });

        return res.status(201).json({
            success: true,
            data
        });
    } catch (error) {
        next(error);
    }
});

router.patch(
    "/:id",
    validateResource("busStop", "update"),
    (req, res) => {
        const data = busStopsService.update(req.params.id, req.body);

        res.json({
            success: true,
            message: "parada de bus actualizado correctamente",
            data,
        });
    }
);

router.delete("/:id", (req, res) => {
    const deleted = busStopsService.delete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Parada de autobús eliminada correctamente",
        data: deleted
    });
});

module.exports = router;
