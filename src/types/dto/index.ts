import { getReasonPhrase } from "http-status-codes";
import { ICommonEntityTypes, IUser } from "../entities";

export class IApiResponse<T> {
  status: number;
  message?: Object | null;
  data: T | null;

  constructor(status: number, data: T | null, error?: Object | null) {
    this.status = status;
    this.data = data;
    this.message = error ? error : getReasonPhrase(status);
  }
}

export interface IUserRequest extends IUser {
  Password: string;
  ConfirmPassword: string;
}

export interface IUserResponse extends IUser, ICommonEntityTypes {}
