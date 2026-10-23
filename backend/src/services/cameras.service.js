"use strict";

const seed = require("../data/cameras.seed");
const AppError = require("../utils/appError");
const { randomUUID } = require("node:crypto");

class CamerasService {
    constructor() {
        this.items = structuredClone(seed);
    }

    // Quita acentos, pasa a minúsculas y recorta espacios
    normalizeText(value = "") {
        return String(value)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }

    async getAll(filters = {}) {
        const { search = "", type = "all", status = "all" } = filters;

        let result = [...this.items];
        const normalizedSearch = this.normalizeText(search);

        if (normalizedSearch) {
            result = result.filter((item) => {
                const searchableContent = this.normalizeText(
                    `${item.name} ${item.description} ${item.type}`
                );
                return searchableContent.includes(normalizedSearch);
            });
        }
        if (type !== "all") {
            result = result.filter((item) => item.type === type);
        }
        if (status !== "all") {
            result = result.filter((item) => item.status === status);
        }

        result.sort((a, b) => a.name.localeCompare(b.name, "es"));
        return result;
    }

    getById(id) {
        const item = this.items.find((entry) => entry.id === id);
        if (!item) {
            throw new AppError(404, `No se encontró cámara con id ${id}`);
        }
        return item;
    }

    async getGeoJSON(filters = {}) {
        const items = await this.getAll(filters);
        return {
            type: "FeatureCollection",
            features: items.map(({ location, ...properties }) => ({
                type: "Feature",
                geometry: location,
                properties,
            })),
        };
    }

    async create(data) {
        const newDate = new Date().toISOString();
        const newItem = {
            id: randomUUID(),
            name: data.name.trim(),
            type: data.type,
            status: data.status,
            description: data.description.trim(),
            routesCount: data.routesCount,
            location: {
                type: "Point",
                coordinates: [
                    Number(data.longitude),
                    Number(data.latitude)
                ]
            },
            createdAt: newDate,
            updatedAt: newDate,
        };
        this.items.push(newItem);
        return newItem;
    }
}

module.exports = new CamerasService();
