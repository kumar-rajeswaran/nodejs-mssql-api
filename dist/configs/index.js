"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_NAME = exports.DB_PWD = exports.DB_USER = exports.DB_HOST = exports.SERVER_PORT = exports.DbQueries = exports.DbConfig = void 0;
const db_config_1 = require("./db.config");
Object.defineProperty(exports, "DbConfig", { enumerable: true, get: function () { return db_config_1.DbConfig; } });
const db_queries_1 = require("./db.queries");
Object.defineProperty(exports, "DbQueries", { enumerable: true, get: function () { return db_queries_1.DbQueries; } });
const env_config_1 = require("./env.config");
Object.defineProperty(exports, "SERVER_PORT", { enumerable: true, get: function () { return env_config_1.SERVER_PORT; } });
Object.defineProperty(exports, "DB_HOST", { enumerable: true, get: function () { return env_config_1.DB_HOST; } });
Object.defineProperty(exports, "DB_USER", { enumerable: true, get: function () { return env_config_1.DB_USER; } });
Object.defineProperty(exports, "DB_PWD", { enumerable: true, get: function () { return env_config_1.DB_PWD; } });
Object.defineProperty(exports, "DB_NAME", { enumerable: true, get: function () { return env_config_1.DB_NAME; } });
