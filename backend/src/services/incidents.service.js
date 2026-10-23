"use strict";

const { randomUUID } = require("node:crypto");

const seedIncidentes = require("../data/incidents.seed");
const AppError = require("../utils/appError");

class IncidentsService {
    constructor(){
        this.incidents = structuredClone(seedIncidentes);
    }

    normalizeText(value = "") {
        return String(value)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }

    // Obtener todos y filtrar
    async getAll(filters = {}) {
        const{
            search = "",
            category = "all",
            status = "all",
        } = filters;

        let result = [...this.incidents];
        const normalizedSearch = this.normalizeText(search);
        if(normalizedSearch){
            result = result.filter ((incident) => {
                const searchableContent = this.normalizeText(
                    `${incident.title} ${incident.description} ${incident.category}`
                );

                return searchableContent.includes(normalizedSearch);
            })
        }
        if (category !== "all"){
            result = result.filter(
                (incident  => incident.category === category)
            );
        }
        if (status !== "all"){
            result = result.filter(
                (incident  => incident.status === status)
            );
        }
        result.sort(
            (first, second) => new Date(second.createdAt) - new Date(first.createdAt)
        );
        return result;
    }

    getById(id){
        const incident = this.incidents.find((incident) => incident.id === id);
        if(!incident){
            throw new AppError(404, `No se encontro el incidente con id ${id}`);
        }
        return incident;
    }

    async getGeoJSON(filters = {}) {
        const incidents = await this.getAll(filters);
        return {
            type: "FeatureCollection",
            features: incidents.map(({ location, ...properties }) => ({
                type: "Feature",
                geometry: location,
                properties,
            })),
        };
    }

    create(data) {
        const currentDate = new Date().toISOString();
        const newIncident = {
            id: `INC-${randomUUID()}`,
            title: data.title,
            category: data.category,
            description: data.description.trim(),
            status: data.status,
            location: {
                type: "Point",
                coordinates: [
                    Number(data.longitude),
                    Number(data.latitude)
                ]
            },
            createdAt: currentDate,
            updatedAt: currentDate
        }
        this.incidents.push(newIncident);
        return newIncident;
    }

    async update(id, changes) {
        const index = this.incidents.findIndex(
            (incident) => incident.id === id
        );
        if(index === -1){
            throw new AppError(404, `No se encontro el incidente con id ${id}.`);
        };
        const currentIncident = this.incidents[index];
        const currentLongitude = currentIncident.location.coordinates[0];
        const currentLatitude = currentIncident.location.coordinates[1];
        const updatedLongitude = changes.longitude !== undefined ? Number(changes.longitude) : currentLongitude;
        const updatedLatitude = changes.latitude !== undefined ? Number(changes.latitude) : currentLatitude;
        const updatedIncident = {
            ...currentIncident,
            ...(changes.title !== undefined && {
                title: changes.title.trim()
            }),
            ...(changes.category !== undefined && {
                category: changes.category.trim()
            }),
            ...(changes.description !== undefined && {
                description: changes.description.trim()
            }),
            ...(changes.status !== undefined && {
                status: changes.status.trim()
            }),
            location: {
                type: "Point",
                coordinates: [updatedLongitude, updatedLatitude]
            },
            updatedAt: new Date().toISOString()
        }
        this.incidents[index] = updatedIncident;
        return updatedIncident;
    }

    async delete(id) {
        const index = this.incidents.findIndex(
            (incident) => incident.id === id
        );
        if (index === -1){
            throw new AppError(404, `No se encontro el incidente con id ${id}.`);
        }
        this.incidents.splice(index, 1);
    }
}

module.exports = new IncidentsService()