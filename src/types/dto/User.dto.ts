import { ICommonEntityTypes } from "../entities";


export interface IUserDto extends ICommonEntityTypes {
    FirstName: string,
    LastName: string,
    Dob: Date,
    PhoneNumber: string,
    Email: string
}

export interface IUserRequestDto extends IUserDto {
    Password: string,
    ConfirmPassword: string,
}