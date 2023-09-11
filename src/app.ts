import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { SERVER_PORT } from "./configs";
import { IRoutes } from "./types";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/routes";
import { ValidateError } from "tsoa";

export class App {
  public app: express.Application;
  public port: string | number;
  constructor(routes: IRoutes[]) {
    this.app = express();
    this.port = SERVER_PORT || 3000;
    this.initializeMiddlewares();
    this.configSwagger();
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
    this.app.use(function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): Response | void {
      if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
          message: "Validation Failed",
          details: err?.fields,
        });
      }
      if (err instanceof Error) {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }

      next();
    });
  }

  private initializeRoutes(_routes: IRoutes[]) {
    // routes.forEach((route) => {
    //   this.app.use("/api", route.router);
    // });
    RegisterRoutes(this.app);
  }

  private configSwagger() {
    this.app.use("/docs", swaggerUi.serve, async (_req: Request, res: Response) => {
      return res.send(swaggerUi.generateHTML(await import("./swagger/swagger.json")));
    });
  }
}
