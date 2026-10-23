"use strict";

const express = require("express");
const cors = require("cors");

const apiRouter = require("./routes");
const { notFoundHandler, errorHandler } = require("./middlewares/error.handler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api", apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;