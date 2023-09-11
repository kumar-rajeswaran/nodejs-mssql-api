import { hash } from "bcrypt";
import { Request as sqlRequest } from "mssql";
import { DbConfig } from "../configs";
import { ICommonResponse, IObject, IUser, IUserRequestDto } from "../types";
import { usersQuery } from "../queries";
import { StatusCodes } from "http-status-codes";
import { handleError } from "../utils";

export class AuthService {
  private _db = new DbConfig();
  signup = async (userRequest: IUserRequestDto): Promise<ICommonResponse<IObject>> => {
    try {
      let _dbConfig: sqlRequest = await this._db.Connection();
      if (!userRequest) throw new ICommonResponse(400, "Check Values", { userRequest });
      const hashedPassword = await hash(userRequest.Password, 10);
      return new Promise((resolve, reject) => {
        userRequest.Dob = new Date(userRequest.Dob).toISOString().slice(0, 19).replace("T", " ");
        userRequest.CreatedDate = new Date().toISOString().slice(0, 19).replace("T", " ");
        userRequest.UpdatededDate = new Date().toISOString().slice(0, 19).replace("T", " ");
        userRequest.IsActive = true;
        userRequest.Password = hashedPassword;
        _dbConfig
          .query(usersQuery.create(userRequest))
          .then((_result) => {
            return resolve(new ICommonResponse(StatusCodes.CREATED, "User Created Successfully", {}));
          })
          .catch((error) => {
            return reject(new ICommonResponse(StatusCodes.BAD_REQUEST, "Please validate given data", {}, handleError(error)));
          });
      });
    } catch (error: any) {
      throw new ICommonResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error", {}, handleError(error));
    }
  };
  getAll = async (): Promise<ICommonResponse<IUser[]>> => {
    try {
      let _dbConfig: sqlRequest = await this._db.Connection();
      return new Promise((resolve, reject) => {
        _dbConfig
          .query<IUser>(usersQuery.getAll)
          .then((result) => {
            return resolve(new ICommonResponse<IUser[]>(StatusCodes.OK, "Success", result.recordset));
          })
          .catch((error) => {
            return reject(new ICommonResponse(StatusCodes.BAD_REQUEST, "Error", [], handleError(error)));
          });
      });
    } catch (error) {
      throw new ICommonResponse(StatusCodes.INTERNAL_SERVER_ERROR, "error", [], handleError(error));
    }
  };
}
