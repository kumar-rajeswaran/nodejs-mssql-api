import { DbConfig } from "../configs";
import { IApiResponse, IUserEntity, IUserResponse } from "../types";
import CrudService from "./crud.service";
import { StatusCodes } from "http-status-codes";

export class UserService {
  private static instance: UserService | null = null;
  private _db = new DbConfig();
  private _userQuery = new CrudService<Partial<IUserEntity>>("TblUsers");

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new UserService();
    }
    return this.instance;
  }

  async getAll(): Promise<IApiResponse<IUserResponse[]>> {
    try {
      const _dbConfig = await this._db.Connection();
      const result = await _dbConfig.query<IUserEntity[]>(this._userQuery.getAll());

      if (result) {
        const users: IUserResponse[] = result.recordset.map((it) => ({
          CreatedDate: it.CreatedDate,
          Dob: it.Dob,
          Email: it.Email,
          FirstName: it.FirstName,
          Id: it.Id,
          IsActive: it.IsActive,
          LastName: it.LastName,
          PhoneNumber: it.PhoneNumber,
          UpdatedDate: it.UpdatedDate,
        }));
        return new IApiResponse<IUserResponse[]>(StatusCodes.OK, users);
      }

      return new IApiResponse<IUserResponse[]>(StatusCodes.BAD_REQUEST, []);
    } catch (error) {
      throw new IApiResponse<IUserResponse[]>(StatusCodes.INTERNAL_SERVER_ERROR, [], { error });
    }
  }
}
