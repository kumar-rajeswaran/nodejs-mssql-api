import { AuthService } from "../services";
import { NextFunction, Request, Response } from "express";
import { IUserRequest } from "../types";
import { validationResult } from "express-validator";

export class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      let userData: IUserRequest = req.body;
      let resData = await AuthService.getInstance().signup(userData);
      res.status(resData.status).json(resData);
    } catch (error) {
      next(error);
    }
  }
  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      const resData = await AuthService.getInstance().signin(email,password);
      res.status(resData.status).json(resData);
    } catch (error) {
      next(error);
    }
  }
}
