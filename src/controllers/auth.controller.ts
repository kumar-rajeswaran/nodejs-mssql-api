import { AuthService } from "../services";
import { NextFunction, Request, Response } from "express";
import { ICommonResponse, IUserRequestDto } from "../types";

export class AuthController {
  private _authService = new AuthService();
  get = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      let resData = await this._authService.getAll();
      res.status(resData.status).json(resData);
    } catch (error) {
      next(error);
    }
  };
  signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let userData: IUserRequestDto = req.body;
      let resData: ICommonResponse = await this._authService.signup(userData);
      res.status(resData.status).json(resData);
    } catch (error) {
      next(error);
    }
  };
}
