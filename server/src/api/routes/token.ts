import { Router, Request, Response } from "express";
import admin from "firebase-admin";
import Token from "../../models/token";

const route = Router();

export default (app: Router) => {
  app.use("/token", route);

  route.post("/registration", (req: Request, res: Response) => {
    const TokenModel = Token;
    const TokenData = new TokenModel({
      token: req.body.token,
    });
    TokenData.save();
    return res.json({ result: "Token registration successful." }).status(200);
  });

  route.post("/subscribe", (req: Request, res: Response) => {
    admin
      .messaging()
      .subscribeToTopic(req.body.token, req.body.topic)
      .then((res) => console.log("success to sub", res))
      .catch((err) => console.log("err : ", err));

    return res
      .json({ result: "You have been successfully subscribed." })
      .status(200);
  });
};
