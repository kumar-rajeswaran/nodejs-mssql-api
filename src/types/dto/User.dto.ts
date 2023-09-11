import { ICommonEntityTypes } from "../entities";

export interface IUserDto extends ICommonEntityTypes {
  FirstName: string;
  LastName: string;
  Dob: string;
  PhoneNumber: string;
  Email: string;
}

export interface IUserRequestDto extends IUserDto {
  Password: string;
  ConfirmPassword: string;
}
