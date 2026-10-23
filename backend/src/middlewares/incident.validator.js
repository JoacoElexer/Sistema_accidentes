"use strict";

const AppError = require("../utils/appError");

const ALLOWED_STATUS = ["pendiente", "resuelto"];

function validateIncident(req, _res, next) {
    const { title, category, description, status, location } = req.body ?? {};
    const errors = [];

    if (typeof title !== "string" || !title.trim()) errors.push("title es obligatorio");
    if (typeof category !== "string" || !category.trim()) errors.push("category es obligatorio");
    if (typeof description !== "string" || !description.trim()) errors.push("description es obligatorio");
    if (!ALLOWED_STATUS.includes(status)) {
        errors.push(`status debe ser uno de: ${ALLOWED_STATUS.join(", ")}`);
    }

    const coords = location?.coordinates;
    const validPoint =
        location?.type === "Point" &&
        Array.isArray(coords) &&
        coords.length === 2 &&
        coords.every((n) => typeof n === "number") &&
        coords[0] >= -180 && coords[0] <= 180 &&
        coords[1] >= -90 && coords[1] <= 90;
    if (!validPoint) {
        errors.push("location debe ser un Point GeoJSON con [longitud, latitud]");
    }

    if (errors.length) {
        return next(new AppError(400, "Datos de incidente inválidos", errors));
    }

    req.body = {
        title: title.trim(),
        category: category.trim(),
        description: description.trim(),
        status,
        location: { type: "Point", coordinates: coords },
    };
    next();
}

module.exports = validateIncident;
