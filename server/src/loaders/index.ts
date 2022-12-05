import express from "express";
import mongooseLoader from "./mongoose";
import expressLoader from "./express";

export default async ({ expressApp }: { expressApp: express.Application }) => {
  await mongooseLoader();
  console.info("✌️ DB loaded and connected!");

  await expressLoader({ app: expressApp });
  console.info('✌️ Express loaded');
};
