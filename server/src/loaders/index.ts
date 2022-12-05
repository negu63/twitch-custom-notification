import express from "express";
import mongooseLoader from "./mongoose";
import expressLoader from "./express";
import schedulerLoader from "./scheduler";

export default async ({ expressApp }: { expressApp: express.Application }) => {
  await mongooseLoader();
  console.info("✌️ DB loaded and connected!");

  await expressLoader({ app: expressApp });
  console.info("✌️ Express loaded");

  schedulerLoader();
  console.info("✌️ Scheduler loaded");
};
