import express, { Express } from "express";
import cors from "cors";
const app = express();
import env from "dotenv";
env.config();

import mongoose from "mongoose";
import bodyParser from "body-parser";

const init = () => {
  const promise = new Promise<Express>((resolve) => {
    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("connected to database"));
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is not defined");
    }
    mongoose.connect(databaseUrl).then(() => {
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use(cors());
      resolve(app);
    });
  });
  return promise;
};

export default init;
