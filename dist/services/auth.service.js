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
Object.defineProperty(exports, "__esModule", { value: true });
const configs_1 = require("../configs");
const dto_1 = require("../models/dto");
class AuthService {
    constructor() {
        this._db = new configs_1.DbConfig();
        this.signup = (userRequest) => __awaiter(this, void 0, void 0, function* () {
            try {
                let _dbConfig = yield this._db.Connection();
                if (!userRequest)
                    throw new dto_1.CommonResponse(400, "userData is empty", '');
                return new Promise((resolve, reject) => {
                    let _dbQries = new configs_1.DbQueries(userRequest);
                    _dbConfig
                        .query(_dbQries.InsertUser())
                        .then((result) => {
                        return resolve(new dto_1.CommonResponse(201, 'Created', userRequest));
                    })
                        .catch((error) => {
                        return resolve(new dto_1.CommonResponse(409, 'Created', userRequest));
                    });
                });
            }
            catch (error) {
                throw new dto_1.CommonResponse(500, "Internal Server Error", userRequest);
            }
        });
    }
}
exports.default = AuthService;
