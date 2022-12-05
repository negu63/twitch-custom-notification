import { Router } from "express";
import token from "./routes/token";

export default () => {
  const app = Router();
  token(app);
  return app;
};
