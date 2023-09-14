import { AuthService } from "../services";
import { NextFunction, Request, Response } from "express";
import { IUserRequest } from "../types";

export class AuthController {
  public async users(_req: Request, res: Response, next: NextFunction) {
    try {
      const userData = await AuthService.getInstance().getAll();
      res.status(userData.status).json(userData);
    } catch (error) {
      next(error);
    }
  }
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      let userData: IUserRequest = req.body;
      let resData = await AuthService.getInstance().signup(userData);
      res.status(resData.status).json(resData);
    } catch (error) {
      next(error);
    }
  }
}
