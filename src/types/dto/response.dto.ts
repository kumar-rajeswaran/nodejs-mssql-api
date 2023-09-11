// export interface ICommonResponse {
//     status: number,
//     body: any,
//     message: string
// }

import { IObject } from "../common";

export class ICommonResponse<T> {
  status: number;
  body: T | IObject;
  message: string;
  error?: IObject;

  constructor(status: number, message: string, body: T | IObject, error?: IObject) {
    this.status = status;
    this.message = message;
    this.body = body;
    this.error = error;
  }
}
