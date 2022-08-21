"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConfig = void 0;
const mssql_1 = __importDefault(require("mssql"));
const _1 = require(".");
class DbConfig {
    constructor() {
        this.generateSqlConnectionString = () => {
            return {
                user: `${_1.DB_USER}`,
                password: `${_1.DB_PWD}`,
                server: `${_1.DB_HOST}`,
                database: `${_1.DB_NAME}`,
                options: {
                    trustedconnection: true,
                    enableArithAbort: true,
                }
            };
        };
        this.createPool = () => __awaiter(this, void 0, void 0, function* () {
            return yield mssql_1.default.connect(this.config);
        });
        this.createConnection = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.pool.request();
        });
        this.Connection = () => __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(this.config);
            let req = yield pool.request();
            return req;
        });
        this.config = this.generateSqlConnectionString();
        this.pool = this.createPool();
        this.connection = this.createConnection();
        this.result = [];
        console.log('DB connected');
    }
}
exports.DbConfig = DbConfig;
