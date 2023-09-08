import { hash } from "bcrypt";
import { Request as sqlRequest } from "mssql";
import { DbConfig } from "../configs";
import { ICommonResponse, IUser, IUserRequestDto } from "../types";
import { usersQuery } from "../queries";

export class AuthService {
  private _db = new DbConfig();
  signup = async (userRequest: IUserRequestDto): Promise<ICommonResponse> => {
    try {
      let _dbConfig: sqlRequest = await this._db.Connection();
      if (!userRequest) throw new ICommonResponse(400, "Check Values", "");
      const hashedPassword = await hash(userRequest.Password, 10);
      return new Promise((resolve, reject) => {
        userRequest.CreatedDate = new Date().toISOString().slice(0, 19).replace("T", " ");
        userRequest.UpdatededDate = new Date().toISOString().slice(0, 19).replace("T", " ");
        userRequest.IsActive = true;
        userRequest.Password = hashedPassword;
        _dbConfig
          .query(usersQuery.create(userRequest))
          .then((result: any) => {
            return resolve(new ICommonResponse(201, "Created", userRequest));
          })
          .catch((error: any) => {
            return resolve(new ICommonResponse(409, "Created", userRequest));
          });
      });
    } catch (error) {
      throw new ICommonResponse(500, "Internal Server Error", userRequest);
    }
  };
  getAll = async (): Promise<ICommonResponse> => {
    try {
      let _dbConfig: sqlRequest = await this._db.Connection();
      return new Promise((resolve, reject) => {
        _dbConfig
          .query<IUser>(usersQuery.getAll)
          .then((result) => {
            return resolve(new ICommonResponse(200, "Success", result.recordset));
          })
          .catch((error: any) => {
            console.log("error->", { error });
            return resolve(new ICommonResponse(400, "Error", { error }));
          });
      });
    } catch (error) {
      throw new ICommonResponse(500, "Internal Server Error", { error });
    }
  };
}
