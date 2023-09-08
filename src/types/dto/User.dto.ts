import { CommonValues } from "../entities";


export interface UserDto extends CommonValues {
    FirstName: string,
    LastName: string,
    Dob: Date,
    PhoneNumber: string,
    Email: string
}

export interface UserRequestDto extends UserDto {
    Password: string,
    ConfirmPassword: string,
}