"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const auth_route_1 = require("./routes/auth.route");
const app = new app_1.App([new auth_route_1.AuthRoute()]);
app.listen();
