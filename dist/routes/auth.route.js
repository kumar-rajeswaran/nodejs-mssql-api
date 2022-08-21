"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
class AuthRoute {
    constructor() {
        this.path = '/';
        this.router = (0, express_1.Router)();
        this.controller = new controllers_1.AuthController();
        this.initialize = () => {
            this.router.post(`${this.path}signup`, this.controller.signUp);
        };
        this.initialize();
    }
}
exports.AuthRoute = AuthRoute;
