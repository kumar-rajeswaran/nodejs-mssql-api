import { NextFunction, Request, Response } from "express";
import { ValidateError } from "tsoa";

export const errorMiddleware = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = 500;
    const message: string = error.message || "Something went wrong";
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
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
};
