import { DEFALTS } from "../configs.js";
import { JobModel } from "../models/job.js";

export class JobController {
  static getAll = async (request, response) => {
    const {
      limit = DEFALTS.LIMIT_PAGINATION,
      offset = DEFALTS.OFFSET_PAGINATIN,
      text,
      title,
      technology,
      level,
    } = request.query;

    const limitNumber = Number(limit);
    const offsetNumber = Number(offset);

    const jobsPaginated = await JobModel.getAll({
      limit: limitNumber,
      offset: offsetNumber,
      text,
      title,
      technology,
      level,
    });

    response.json({
      data: jobsPaginated,
      total: jobsPaginated.length,
      offset: offsetNumber,
      limit: limitNumber,
    });
  };

  static getOne = async (request, response) => {
    const { id } = request.params;
    const jobFiltered = await JobModel.getOne(id);
    if (!jobFiltered)
      return response.status(400).send({ message: "Not found" });
    response.send(jobFiltered);
  };

  static create = async (request, response) => {
    const { titulo, empresa, ubicacion, descripcion, data } = request.body;
    const newJob = await JobModel.create({
      titulo,
      empresa,
      ubicacion,
      descripcion,
      data,
    });

    response.status(201).send(newJob);
  };

  static update = async (request, response) => {
    const { id } = request.params;
    const { titulo, empresa, ubicacion, descripcion } = request.body;

    const updated = await JobModel.update(id, {
      titulo,
      empresa,
      ubicacion,
      descripcion,
    });
    if (!updated) return response.status(400).send({ message: "Not found" });

    response.status(200).send(updated);
  };

  static delete = async (request, response) => {
    const { id } = request.params;
    const deleted = await JobModel.delete(id);
    if (!deleted) return response.status(400).send({ message: "Not found" });

    response.send({ message: "job deleted" });
  };
}
