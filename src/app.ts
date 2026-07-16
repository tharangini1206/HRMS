import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json";

import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

// Parse JSON Body
app.use(express.json());

// Enable CORS
app.use(cors());

// Security Headers
app.use(helmet());

// API Logging
app.use(morgan("dev"));

// Rate Limiter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

// Swagger Documentation
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// Version 1 APIs
app.use("/api", routes);

// Global Error Handler
app.use(errorHandler);

export default app;