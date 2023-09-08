import { Router } from "express";
import { AuthController } from "../controllers";
import { Routes } from "../types";

export class AuthRoute implements Routes {
    public path = '/auth/';
    public router = Router();
    public controller = new AuthController();

    constructor() {
        this.initialize();
    }
    initialize = () => {
        this.router.get(`${this.path}get`, this.controller.get)
        this.router.post(`${this.path}signup`, this.controller.signUp);
    }
}