import { DEFALTS } from "../configs.js";
import cors from "cors";

export const corsMiddleware = ({
  acceptedOrigins = DEFALTS.ACCEPTED_ORIGINS,
} = {}) => {
  return cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) return callback(null, true);

      return callback(new Error(`Origin '${origin}' not allowd`));
    },
  });
};
