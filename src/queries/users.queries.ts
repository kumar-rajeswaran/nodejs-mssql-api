import { IUserRequestDto } from "../types";

export const usersQuery = {
  get: (userId: number) => `select * from tblusers where userid ='${userId}';`,
  getAll: `select * from tblusers where IsActive=1;`,
  create: (user: IUserRequestDto) => `INSERT INTO TblUsers 
  (FirstName, LastName, Dob, PhoneNumber, Email, Password, IsActive, CreatedDate, UpdatededDate) 
  VALUES('${user.FirstName}', '${user.LastName}', '${user.Dob}', '${user.PhoneNumber}', '${user.Email}', '${user.Password}', '${user.IsActive}', '${user.CreatedDate}', '${user.UpdatededDate}');`,
  update:(user: IUserRequestDto)=>`UPDATE TblUsers
  SET FirstName='${user.FirstName}', LastName='${user.LastName}', Dob='${user.Dob}', PhoneNumber='${user.PhoneNumber}', Email='${user.Email}', Password='${user.Password}', IsActive=${user.IsActive}, CreatedDate='${user.CreatedDate}', UpdatededDate='${user.UpdatededDate}'
  WHERE Id=${user.Id};`,
  delete:(userId: number)=>`UPDATE TblUsers SET IsActive=0 WHERE Id=${userId};`
};
