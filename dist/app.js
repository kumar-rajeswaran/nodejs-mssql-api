"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const configs_1 = require("./configs");
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.port = configs_1.SERVER_PORT || 3000;
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 http://localhost${this.port}`);
        });
    }
    initializeMiddlewares() {
        this.app.use((0, morgan_1.default)('tiny'));
        this.app.use((0, cors_1.default)({ origin: '*', credentials: true }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
    }
    initializeRoutes(routes) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }
}
exports.App = App;
