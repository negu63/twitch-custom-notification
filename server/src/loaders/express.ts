import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import routes from "../api";
import config from "../config";

interface ResponseError extends Error {
  status?: number;
}

export default ({ app }: { app: express.Application }) => {
  app.get("/health", (req, res) => {
    res.status(200).end('200 Ok');
  });

  app.use(cors());
  app.use(express.json());
  app.use(config.api.prefix, routes());

  app.use((req, res, next) => {
    const err: ResponseError = new Error("404 Not Found");
    err.status = 404;
    next(err);
  });

  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  };

  app.use(errorHandler);
};
