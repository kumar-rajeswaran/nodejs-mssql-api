import { NextFunction, Request, Response } from 'express';

exports.errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    try {
        const status: number = 500;
        const message: string = error.message || 'Something went wrong';
        res.status(status).json({ message });
    } catch (error) {
        next(error);
    }
};

