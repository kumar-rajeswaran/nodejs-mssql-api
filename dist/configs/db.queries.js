"use strict";
// export const DbQueries = {
//     GetUsers: `SELECT * FROM TblUsers;`,
//     GetUserById: `SELECT * FROM TblUsers WHERE Id=?;`,
//     GetUserByEmail: `SELECT * FROM TblUsers WHERE Email='?';`,
//     InsertUser: `INSERT INTO TblUsers
//     (FirstName, LastName, Dob, PhoneNumber, Email, Password, IsActive, CreatedDate, UpdatededDate)
//     VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);`,
//     UpdateUser: `UPDATE TblUsers
//     SET FirstName=?, LastName=?, Dob=?, PhoneNumber=?, Email=?, Password=?, IsActive=?, CreatedDate=?, UpdatededDate=?
//     WHERE Id=?;`,
//     DeleteUser: `DELETE FROM TblUsers WHERE Id=?;`
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbQueries = void 0;
class DbQueries {
    constructor(userReq) {
        this.InsertUser = () => {
            return `INSERT INTO TblUsers
        (FirstName, LastName, Dob, PhoneNumber, Email, Password, IsActive, CreatedDate, UpdatededDate)
        VALUES('${this.user.FirstName}', '${this.user.LastName}', '${this.user.Dob}', 
        '${this.user.PhoneNumber}', '${this.user.Email}', '${this.user.Password}', 
        '${this.user.IsActive}', '${this.user.CreatedDate}', '${this.user.UpdatededDate}');`;
        };
        this.user = userReq;
    }
}
exports.DbQueries = DbQueries;
