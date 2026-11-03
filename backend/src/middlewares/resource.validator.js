
"use strict";

const AppError = require("../utils/appError");

const schemas = {
    incident: {
        required: ["title", "category", "description", "status", "location"],
        fields: ["title", "category", "description", "status", "location"],
        enums: {
            status: ["pendiente", "resuelto"],
        },
    },

    camera: {
        required: [
            "name", "type", "status", "description",
            "rangeMeters", "location",
        ],
        fields: [
            "name", "type", "status", "description",
            "rangeMeters", "location",
        ],
        enums: {
            type: ["ptz", "fija", "lectora_placas"],
            status: ["activa", "mantenimiento", "falla"],
        },
        numbers: ["rangeMeters"],
    },

    hospital: {
        required: [
            "name", "type", "status", "description",
            "beds", "location",
        ],
        fields: [
            "name", "type", "status", "description",
            "beds", "location",
        ],
        enums: {
            type: ["hospital", "clinica", "cruz_roja"],
            status: ["operando", "saturado", "cerrado"],
        },
        integers: ["beds"],
    },

    station: {
        required: [
            "name", "type", "status", "description",
            "units", "location",
        ],
        fields: [
            "name", "type", "status", "description",
            "units", "location",
        ],
        enums: {
            type: ["bomberos", "policia", "proteccion_civil"],
            status: ["activa", "inactiva"],
        },
        integers: ["units"],
    },

    busStop: {
        required: [
            "name", "type", "status", "description",
            "routesCount", "location",
        ],
        fields: [
            "name", "type", "status", "description",
            "routesCount", "location",
        ],
        enums: {
            type: ["troncal", "alimentadora", "auxiliar"],
            status: ["operando", "suspendida"],
        },
        integers: ["routesCount"],
    },
};

function isValidLocation(location) {
    if (!location || location.type !== "Point") {
        return false;
    }

    const coordinates = location.coordinates;

    return (
        Array.isArray(coordinates) &&
        coordinates.length === 2 &&
        coordinates.every(
            (value) =>
                typeof value === "number" &&
                Number.isFinite(value)
        ) &&
        coordinates[0] >= -180 &&
        coordinates[0] <= 180 &&
        coordinates[1] >= -90 &&
        coordinates[1] <= 90
    );
}

function validateResource(entity, mode = "create") {
    return (req, _res, next) => {
        const schema = schemas[entity];

        if (!schema) {
            return next(new AppError(500, "Configuración de validación inexistente"));
        }

        const body = req.body;

        if (!body || typeof body !== "object" || Array.isArray(body)) {
            return next(
                new AppError(400, "El cuerpo de la petición debe ser un objeto JSON")
            );
        }

        const errors = [];
        const isUpdate = mode === "update";

        if (isUpdate && Object.keys(body).length === 0) {
            errors.push("Debe enviar al menos un campo para actualizar");
        }

        for (const field of Object.keys(body)) {
            if (!schema.fields.includes(field)) {
                errors.push(`El campo '${field}' no está permitido`);
            }
        }

        if (!isUpdate) {
            for (const field of schema.required) {
                if (body[field] === undefined) {
                    errors.push(`${field} es obligatorio`);
                }
            }
        }

        for (const field of Object.keys(body)) {
            const value = body[field];

            if (!schema.fields.includes(field)) continue;

            if (field === "location") {
                if (!isValidLocation(value)) {
                    errors.push(
                        "location debe ser un Point GeoJSON con [longitud, latitud]"
                    );
                }
                continue;
            }

            if (schema.enums?.[field]) {
                if (!schema.enums[field].includes(value)) {
                    errors.push(
                        `${field} debe ser uno de: ${schema.enums[field].join(", ")}`
                    );
                }
                continue;
            }

            if (schema.integers?.includes(field)) {
                if (!Number.isInteger(value) || value < 0) {
                    errors.push(`${field} debe ser un entero mayor o igual a 0`);
                }
                continue;
            }

            if (schema.numbers?.includes(field)) {
                if (
                    typeof value !== "number" ||
                    !Number.isFinite(value) ||
                    value < 0
                ) {
                    errors.push(`${field} debe ser un número mayor o igual a 0`);
                }
                continue;
            }

            if (typeof value !== "string" || !value.trim()) {
                errors.push(`${field} debe ser una cadena de texto no vacía`);
            }
        }

        if (errors.length > 0) {
            return next(
                new AppError(400, `Datos de ${entity} inválidos`, errors)
            );
        }

        req.body = Object.fromEntries(
            Object.entries(body).map(([field, value]) => [
                field,
                typeof value === "string" ? value.trim() : value,
            ])
        );

        next();
    };
}

module.exports = validateResource;
