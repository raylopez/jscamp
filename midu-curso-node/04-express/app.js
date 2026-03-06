import { DEFALTS } from "./configs.js";
import express from "express";
import { corsMiddleware } from "./middlewares/corsMiddleware.js";
import {
  generalMiddleware,
  prevHomeMiddleware,
} from "./middlewares/middlewares.js";
import { jobsRouter } from "./routes/jobs.js";

const port = process.env.PORT ?? DEFALTS.PORT;
const app = express();

app.use(corsMiddleware());
app.use(generalMiddleware);
app.use(express.json());

app.get("", prevHomeMiddleware, (req, res) => {
  res.send("<h1>Bienvenido</h1>");
});

app.get("/health", (request, response) => {
  response.send({ status: "ok", uptime: process.uptime() });
});

//Routes
app.use("/jobs", jobsRouter);

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Listen on: http://localhost:${port}`);
  });
}

export default app;
