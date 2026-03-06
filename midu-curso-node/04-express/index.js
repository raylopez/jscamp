import express from "express";
import { createJobRouter } from "./routes/jobs.js";
import { DEFALTS } from "./configs.js";
import {
  generalMiddleware,
  prevHomeMiddleware,
} from "./middlewares/middlewares.js";
import cors from "cors";

const port = process.env.PORT ?? DEFALTS.PORT;
const app = express();

const delay = async (milliseconsds) => {
  return await new Promise((resolve) => setTimeout(resolve, milliseconsds));
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (DEFALTS.ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) return callback(null, true);

      return callback(new Error(`Origin '${origin}' not allowd`));
    },
  }),
);
app.use(express.json());
app.use(generalMiddleware);

app.get("", prevHomeMiddleware, (req, res) => {
  res.send("<h1>Bienvenido</h1>");
});

app.get("/health", (request, response) => {
  response.send({ status: "ok", uptime: process.uptime() });
});

app.use("/jobs", createJobRouter());

app.listen(port, () => {
  console.log(`Listen on: http://localhost:${port}`);
});
