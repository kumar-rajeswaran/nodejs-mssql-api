"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = (error, req, res, next) => {
    try {
        const status = 500;
        const message = error.message || 'Something went wrong';
        res.status(status).json({ message });
    }
    catch (error) {
        next(error);
    }
};
