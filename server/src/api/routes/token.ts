import { Router, Request, Response } from "express";
import Token from "../../models/token";
import { TIME_ZONE } from "../../constants/timezone";

const route = Router();

export default (app: Router) => {
  app.use("/token", route);

  route.post("/registration", (req: Request, res: Response) => {
    const TokenModel = Token;
    const TokenData = new TokenModel({
      token: req.body.token,
      createdAt: new Date(+new Date() + TIME_ZONE)
        .toISOString()
        .slice(0, -4)
        .replace(/[-T:.Z]/g, ""),
    });
    TokenData.save();
    return res.json({ result: "Token registration successful." }).status(200);
  });

  route.post("/subscribe", (req: Request, res: Response) => {
    // TODO: Implement subscribe logic
  });
};
