
const { randomUUID } = require("crypto");
const seedIncidentes = require("../data/incidents.seed");
const AppError = require("../utils/appError");

class IncidentsService {
  constructor() {
    this.incidents = structuredClone(seedIncidentes);
  }

  normalizeText(value = "") {
    return String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  getAll(filters = {}) {
    const { search = "", category = "all", status = "all" } = filters;
    const normalizedSearch = this.normalizeText(search);

    return this.incidents.filter((incident) => {
      const matchesSearch = !normalizedSearch || this.normalizeText(
        `${incident.title} ${incident.category} ${incident.description}`
      ).includes(normalizedSearch);
      const matchesCategory = category === "all" || incident.category === category;
      const matchesStatus = status === "all" || incident.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  getById(id) {
    const incident = this.incidents.find((item) => item.id === id);

    if (!incident) {
      throw new AppError(404, "Incidente no encontrado");
    }

    return incident;
  }

  getGeoJSON(filters = {}) {
    return {
      type: "FeatureCollection",
      features: this.getAll(filters).map((incident) => ({
        type: "Feature",
        geometry: incident.location,
        properties: {
          id: incident.id,
          title: incident.title,
          category: incident.category,
          description: incident.description,
          status: incident.status,
          createdAt: incident.createdAt,
          updatedAt: incident.updatedAt,
        },
      })),
    };
  }

  create(data) {
    const now = new Date().toISOString();

    const incident = {
      id: `INC-${randomUUID()}`,
      title: data.title,
      category: data.category,
      description: data.description,
      status: data.status ?? "pendiente",
      location: structuredClone(data.location),
      createdAt: now,
      updatedAt: now,
    };

    this.incidents.push(incident);

    return incident;
  }

  update(id, changes) {
    const incident = this.getById(id);

    const allowedFields = [
      "title",
      "category",
      "description",
      "status",
      "location",
    ];

    for (const field of allowedFields) {
      if (changes[field] !== undefined) {
        incident[field] =
          field === "location"
            ? structuredClone(changes[field])
            : changes[field];
      }
    }

    incident.updatedAt = new Date().toISOString();

    return incident;
  }

  delete(id) {
    const index = this.incidents.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new AppError(404, "Incidente no encontrado");
    }

    const [deletedIncident] = this.incidents.splice(index, 1);

    return deletedIncident;
  }
}

module.exports = new IncidentsService();
