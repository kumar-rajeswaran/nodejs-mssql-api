import { hash } from "bcrypt";
import { pool, Request as sqlRequest } from "mssql";
import { DbConfig, DbQueries } from "../configs";
import { CommonResponse, UserRequestDto } from "../models/dto";

export default class AuthService {

    private _db = new DbConfig();
    signup = async (userRequest: UserRequestDto): Promise<CommonResponse> => {
        try {
            let _dbConfig: sqlRequest = await this._db.Connection();
            if (!userRequest) throw new CommonResponse(400, "Check Values", '');
            const hashedPassword = await hash(userRequest.Password, 10);
            return new Promise((resolve, reject) => {
                userRequest.CreatedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
                userRequest.UpdatededDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
                userRequest.IsActive = true;
                userRequest.Password = hashedPassword;
                let _dbQries = new DbQueries(userRequest)
                _dbConfig
                    .query(_dbQries.InsertUser())
                    .then((result: any) => {
                        return resolve(new CommonResponse(201, 'Created', userRequest))
                    })
                    .catch((error: any) => {
                        return resolve(new CommonResponse(409, 'Created', userRequest))
                    });
            })
        } catch (error) {
            throw new CommonResponse(500, "Internal Server Error", userRequest);
        }
    }
}