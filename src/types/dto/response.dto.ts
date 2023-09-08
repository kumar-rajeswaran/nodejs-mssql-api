// export interface ICommonResponse {
//     status: number,
//     body: any,
//     message: string
// }

export class ICommonResponse {
    status: number;
    body: any;
    message: string;

    constructor(status: number, message: string, body: any) {
        this.status = status;
        this.message = message;
        this.body = body;
    }
}
