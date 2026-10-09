"use strict";

const { randomUUID } = require("node:crypto");

const seedIncidentes = require("../data/incidents.seed");
const AppError = require("../utils/appError");

class IncidentsService {
    constructor(){
        this.incidents = structuredClone(seedIncidentes);
    }

    // Obtener todos y filtrar
    async getAll(filters = {}) {
        const{
            search = "",
            category = "all",
            status = "all",
        } = filters;

        let result = [...this.incidents];
        const notmalizedSearch = this.normalizedSearch(search);
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

    create(incidentData) {
        const newIncident = {
            ...incidentData,
            id: randomUUID(),
            createdAt: new Date().toISOString(),
        }
        this.incidents.push(newIncident);
        return newIncident;
    }
}