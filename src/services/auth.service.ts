import { hash } from "bcrypt";
import { Request as sqlRequest } from "mssql";
import { DbConfig } from "../configs";
import { IApiResponse, IUserEntity, IUserRequest, IUserResponse } from "../types";
import { StatusCodes } from "http-status-codes";
import { usersQueries } from "../queries";

export default class AuthService {
  private _db = new DbConfig();
  private static _authServiceInstance: AuthService | null = null;
  public static getInstance() {
    if (!this._authServiceInstance) {
      this._authServiceInstance = new AuthService();
    }
    return this._authServiceInstance;
  }
  public async signup(userRequest: IUserRequest): Promise<IApiResponse<string>> {
    try {
      let _dbConfig: sqlRequest = await this._db.Connection();
      if (!userRequest.Password) return new IApiResponse<string>(StatusCodes.BAD_REQUEST, null);
      const hashedPassword = await hash(userRequest.Password, 10);
      return new Promise((resolve, _reject) => {
        const userParams: Partial<IUserEntity> = {
          CreatedDate: new Date().toISOString().slice(0, 19).replace("T", " "),
          Dob: new Date(userRequest.Dob).toISOString().slice(0, 19).replace("T", " "),
          Email: userRequest.Email,
          FirstName: userRequest.FirstName,
          IsActive: true,
          LastName: userRequest.LastName,
          Password: hashedPassword,
          PhoneNumber: userRequest.PhoneNumber,
          UpdatededDate: new Date().toISOString().slice(0, 19).replace("T", " "),
        };

        _dbConfig
          .query(usersQueries.create(userParams))
          .then((result) => {
            return resolve(
              new IApiResponse<string>(
                result.rowsAffected.length ? StatusCodes.CREATED : StatusCodes.BAD_REQUEST,
                result.rowsAffected.length ? "User Created Successfully!" : "Unable Create User!"
              )
            );
          })
          .catch((error: any) => {
            return resolve(new IApiResponse<string>(StatusCodes.BAD_REQUEST, null, { error }));
          });
      });
    } catch (error) {
      return new IApiResponse<string>(StatusCodes.INTERNAL_SERVER_ERROR, null, { error });
    }
  }
  public async getAll(): Promise<IApiResponse<IUserResponse[]>> {
    try {
      let _dbConfig: sqlRequest = await this._db.Connection();
      return new Promise((resolve, reject) => {
        _dbConfig
          .query<IUserEntity[]>(usersQueries.getAll)
          .then((result) => {
            if (result) {
              const users: IUserResponse[] = result.recordset.map((it) => {
                return {
                  CreatedDate: it.CreatedDate,
                  Dob: it.Dob,
                  Email: it.Email,
                  FirstName: it.FirstName,
                  Id: it.Id,
                  IsActive: it.IsActive,
                  LastName: it.LastName,
                  PhoneNumber: it.PhoneNumber,
                  UpdatededDate: it.UpdatededDate,
                };
              });
              return resolve(new IApiResponse<IUserResponse[]>(StatusCodes.OK, users));
            }
          })
          .catch((error) => {
            return reject(new IApiResponse<IUserResponse[]>(StatusCodes.BAD_REQUEST, [], { error }));
          });
      });
    } catch (error) {
      throw new IApiResponse<IUserResponse[]>(StatusCodes.INTERNAL_SERVER_ERROR, [], { error });
    }
  }
}
