import { Router, Request, Response } from "express";
import admin from "firebase-admin";
import Token from "../../models/token";
import { STREAMER_LIST } from "../../constants/stream";

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

  route.post("/subscribe", async (req: Request, res: Response) => {
    const token: string | string[] = req.body.token;
    const topics: string[] = req.body.topics;
    await unsubscribeAllTopic(token);
    await Promise.allSettled(
      topics.map((topic: string) => subscribeTopic(token, topic))
    );

    return res
      .json({ result: "You have been successfully subscribed." })
      .status(200);
  });
};

const unsubscribeAllTopic = async (token: string | string[]) => {
  await Promise.allSettled(
    STREAMER_LIST.map((topic) =>
      admin.messaging().unsubscribeFromTopic(token, topic)
    )
  );
};

const subscribeTopic = (token: string | string[], topic: string) => {
  return admin
    .messaging()
    .subscribeToTopic(token, topic)
    .then((res) => console.log("success to sub", res))
    .catch((err) => console.log("err : ", err));
};
