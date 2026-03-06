import { Router } from "express";
import { JobController } from "../controllers/JobController.js";

export const jobsRouter = Router();

jobsRouter.get("/", JobController.getAll);
jobsRouter.get("/:id", JobController.getOne);
jobsRouter.post("", JobController.create);
jobsRouter.delete("/:id", JobController.delete);
jobsRouter.put("/:id", JobController.update);
