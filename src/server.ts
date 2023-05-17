import express from "express";
import { Application } from "express";
import http from "http";
import routes from "./routes";
import bodyParser from "body-parser";
import connectToDb from "./db";
import RoleModel from "./models/priviledgeModel";
import { IUser } from "./models/userModel";
import cors from "cors";
import mongoose from "mongoose";
const app = express();

class ExpressServer {
  constructor() {
    app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ): void => {
        bodyParser.json({ limit: "100kb" })(req, res, next);
      }
    );
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || "100kb",
      })
    );

    app.use(cors());
  }

  router(routes: (app: Application) => void): ExpressServer {
    app.enable("case sensitive routing");
    app.enable("strict routing");
    // number of proxies/LB between the user and the server.
    // Used by express-rate-limit to read the real client ip via request.ip and not the LB ip address
    app.set("trust proxy", 1);

    routes(app);
    return this;
  }

  listen(p: number): Application {
    const welcome = (port: number) => () =>
      console.log(
        `up and running in ${
          process.env.NODE_ENV || "development"
        } on port: ${port}}`
      );
    connectToDb().then(() => {
      http.createServer(app).listen(p, welcome(p));
    });

    return app;
  }
}

export default new ExpressServer().router(routes).listen(3003);

declare module "express-serve-static-core" {
  interface Request {
    user: any;
    sanitizedData: any;
  }
}
