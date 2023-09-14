import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  try {
    const status = 500;
    const message = error.message || "Something went wrong";
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};
