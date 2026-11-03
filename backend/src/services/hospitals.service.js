
"use strict";

const seed = require("../data/hospitals.seed");
const AppError = require("../utils/appError");
const { randomUUID } = require("node:crypto");

class HospitalsService {
    constructor() {
        this.items = structuredClone(seed);
    }

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
            throw new AppError(
                404,
                `No se encontró hospital o clínica con id ${id}`
            );
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

    create(data) {
        const now = new Date().toISOString();

        const newItem = {
            id: `HOS-${randomUUID()}`,
            name: data.name.trim(),
            type: data.type,
            status: data.status,
            description: data.description.trim(),
            beds: data.beds,
            location: structuredClone(data.location),
            createdAt: now,
            updatedAt: now,
        };

        this.items.push(newItem);

        return newItem;
    }

    update(id, changes) {
        const item = this.getById(id);

        const allowedFields = [
            "name",
            "type",
            "status",
            "description",
            "beds",
            "location",
        ];

        for (const field of allowedFields) {
            if (changes[field] !== undefined) {
                item[field] =
                    field === "location"
                        ? structuredClone(changes[field])
                        : changes[field];
            }
        }

        item.updatedAt = new Date().toISOString();

        return item;
    }

    delete(id) {
        const index = this.items.findIndex((item) => item.id === id);

        if (index === -1) {
            throw new AppError(
                404,
                `No se encontró hospital o clínica con id ${id}`
            );
        }

        const [deletedItem] = this.items.splice(index, 1);

        return deletedItem;
    }
}

module.exports = new HospitalsService();
