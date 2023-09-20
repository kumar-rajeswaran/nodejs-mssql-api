import { NextFunction, Request, Response } from "express";
import { UserService } from "../services";

export class UserController {
  public async users(_req: Request, res: Response, next: NextFunction) {
    try {
      const userData = await UserService.getInstance().getAll();
      res.status(userData.status).json(userData);
    } catch (error) {
      next(error);
    }
  }
}
