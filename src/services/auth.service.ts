import { compareSync, hash } from "bcrypt";
import { DbConfig } from "../configs";
import { IApiResponse, IUserEntity, IUserRequest } from "../types";
import { StatusCodes } from "http-status-codes";
import CrudService from "./crud.service";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../configs";

export class AuthService {
  private _db = new DbConfig();
  private _userQuery = new CrudService<Partial<IUserEntity>>("TblUsers");
  private static _authServiceInstance: AuthService | null = null;
  public static getInstance() {
    if (!this._authServiceInstance) {
      this._authServiceInstance = new AuthService();
    }
    return this._authServiceInstance;
  }
  public async signup(userRequest: IUserRequest): Promise<IApiResponse<string>> {
    try {
      let _dbConfig = await this._db.Connection();
      if (!userRequest.Password) return new IApiResponse<string>(StatusCodes.BAD_REQUEST, null);
      const hashedPassword = await hash(userRequest.Password, 10);
      return new Promise((resolve, reject) => {
        const userParams: Partial<IUserEntity> = {
          CreatedDate: new Date().toISOString().slice(0, 19).replace("T", " "),
          Dob: new Date(userRequest.Dob).toISOString().slice(0, 19).replace("T", " "),
          Email: userRequest.Email,
          FirstName: userRequest.FirstName,
          IsActive: true,
          LastName: userRequest.LastName,
          Password: hashedPassword,
          PhoneNumber: userRequest.PhoneNumber,
          UpdatedDate: new Date().toISOString().slice(0, 19).replace("T", " "),
        };

        _dbConfig
          .query(this._userQuery.create(userParams))
          .then((result) => {
            return resolve(
              new IApiResponse<string>(
                result.rowsAffected.length ? StatusCodes.CREATED : StatusCodes.BAD_REQUEST,
                result.rowsAffected.length ? "User Created Successfully!" : "Unable Create User!"
              )
            );
          })
          .catch((_error) => {
            return reject(new IApiResponse<string>(StatusCodes.BAD_REQUEST, null));
          });
      });
    } catch (error) {
      return new IApiResponse<string>(StatusCodes.INTERNAL_SERVER_ERROR, null, { error });
    }
  }
  public async signin(email: string, password: string): Promise<IApiResponse<string>> {
    try {
      let _dbConfig = await this._db.Connection();
      return new Promise((resolve, reject) => {
        _dbConfig
          .query<IUserEntity>(this._userQuery.findOne({ Email: email }))
          .then((res) => {
            debugger;
            if (res.rowsAffected.length === 1 || compareSync(password, res.recordset[0].Password)) {
              const token = jwt.sign(res.recordset[0], `${SECRET_KEY}`, { expiresIn: "1h" });
              return resolve(new IApiResponse<string>(StatusCodes.OK, token));
            } else {
              return reject(new IApiResponse<string>(StatusCodes.UNAUTHORIZED, "Invalid credentials"));
            }
          })
          .catch((err) => {
            console.log({ err });
            return reject(new IApiResponse<string>(StatusCodes.BAD_REQUEST, null, err));
          });
      });
    } catch (error) {
      console.log({ error });
      return new IApiResponse<string>(StatusCodes.INTERNAL_SERVER_ERROR, null, error as any);
    }
  }
}
