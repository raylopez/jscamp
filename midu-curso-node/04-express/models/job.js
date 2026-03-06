import jobs from "../jobs.json" with { type: "json" };
import { randomUUID } from "node:crypto";

export class JobModel {
  static async getAll({
    limit = 10,
    offset = 0,
    text,
    title,
    technology,
    level,
  } = {}) {
    let jobsFiltered = jobs;

    if (text) {
      const searchTerm = text.toLowerCase();
      jobsFiltered = jobsFiltered.filter(
        (j) =>
          j.titulo.toLowerCase().includes(searchTerm) ||
          j.descripcion.toLowerCase().includes(searchTerm),
      );
    }

    if (technology) {
      jobsFiltered = jobsFiltered.filter((j) =>
        j.data.technology.includes(technology),
      );
    }

    if (title) {
      jobsFiltered = jobsFiltered.filter((j) =>
        j.titulo.toLowerCase().includes(title.toLocaleLowerCase()),
      );
    }

    if (level) {
      jobsFiltered = jobsFiltered.filter((j) =>
        j.data.nivel.toLowerCase().includes(level.toLowerCase()),
      );
    }

    let jobsPaginated = jobsFiltered.slice(offset, offset + limit);

    return jobsPaginated;
  }

  static async getOne(id) {
    return jobs.find((j) => j.id === id);
  }

  static async create({ titulo, empresa, ubicacion, descripcion, data } = {}) {
    const newJob = {
      id: randomUUID(),
      titulo,
      empresa,
      ubicacion,
      descripcion,
      data,
    };

    jobs.push(newJob);

    return newJob;
  }

  static async update(id, { titulo, empresa, ubicacion, descripcion } = {}) {
    const jobById = jobs.find((j) => j.id === id);

    if (!jobById) return null;

    const updated = { ...jobById, titulo, empresa, ubicacion, descripcion };

    return updated;
  }

  static async delete(id) {
    const idx = jobs.findIndex((j) => j.id === id);
    if (idx < 0) return false;

    jobs.splice(idx, 1);

    return true;
  }
}
