import { Router } from "express";
import { AuthController } from "../controllers";
import { IRoutes } from "../types";
import { body } from "express-validator";

export class AuthRoute implements IRoutes {
  public path = "/auth";
  public router = Router();
  public controller = new AuthController();

  constructor() {
    this.initialize();
  }
  initialize = () => {
    this.router.post(`${this.path}/signup`, this.controller.signUp);
    this.router.post(`${this.path}/signin`,  [
      body('email').notEmpty().withMessage('Email is required'),
      body('password').notEmpty().withMessage('Password is required'),
    ], this.controller.signIn);
  };
}
