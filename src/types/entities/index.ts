export interface ICommonEntityTypes {
  Id: number;
  IsActive: boolean;
  CreatedDate: string;
  UpdatededDate: string;
}

export interface IUser {
  FirstName: string;
  LastName: string;
  Dob: string;
  PhoneNumber: string;
  Email: string;
}

export interface IUserEntity extends IUser, ICommonEntityTypes {
  Password: string;
}
