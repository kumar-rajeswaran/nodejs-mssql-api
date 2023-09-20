import { Router } from "express";
import { UserController } from "../controllers";
import { IRoutes } from "../types";
import { authenticate } from "../middlewares";

export class UserRoute implements IRoutes {
  public path = "/user";
  public router = Router();
  public controller = new UserController();

  constructor() {
    this.initialize();
  }
  initialize = () => {
    this.router.get(`${this.path}/users`, authenticate, this.controller.users);
  };
}
