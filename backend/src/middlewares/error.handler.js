"use strict";

const AppError = require("../utils/appError");

function notFoundHandler(req, _res, next) {
    next(new AppError(404, `Ruta no encontrada: ${req.method} ${req.originalUrl}`));
}

function errorHandler(err, _req, res, _next) {
    const statusCode = err.statusCode ?? 500;
    const body = {
        success: false,
        message: err.isOperational ? err.message : "Error interno del servidor",
    };
    if (err.details) body.details = err.details;
    if (!err.isOperational) console.error(err);
    res.status(statusCode).json(body);
}

module.exports = { notFoundHandler, errorHandler };
