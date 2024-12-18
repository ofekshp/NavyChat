import express, { Express } from "express";
import cors from "cors"; 
import env from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authRoute from "./routes/auth_route";

const app = express();
env.config();

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
      // Apply CORS first
      app.use(cors());

      // Then body parsers
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());

      // Explicit OPTIONS handler
      app.options('*', cors());

      // Routes
      app.use("/auth", authRoute);

      resolve(app);
    });
  });
  
  return promise;
};

export default init;