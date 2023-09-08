import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { SERVER_PORT } from "./configs";
import { IRoutes } from "./types";

export class App {
  public app: express.Application;
  public port: string | number;
  constructor(routes: IRoutes[]) {
    this.app = express();
    this.port = SERVER_PORT || 3000;
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 http://localhost:${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(morgan("tiny"));
    this.app.use(cors({ origin: "*", credentials: true }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  private initializeRoutes(routes: IRoutes[]) {
    routes.forEach((route) => {
      this.app.use("/api/", route.router);
    });
  }
}
