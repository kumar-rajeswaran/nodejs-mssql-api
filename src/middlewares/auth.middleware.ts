import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../configs";

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No token provided" });
    } else {
      jwt.verify(token, `${SECRET_KEY}`, (err, decoded) => {
        if (err) {
          res.status(401).json({ message: err.message });
        } else {
          req.user = decoded;
          next();
        }
      });
    }
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
