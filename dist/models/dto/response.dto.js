"use strict";
// export interface CommonResponse {
//     status: number,
//     body: any,
//     message: string
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonResponse = void 0;
class CommonResponse {
    constructor(status, message, body) {
        this.status = status;
        this.message = message;
        this.body = body;
    }
}
exports.CommonResponse = CommonResponse;
