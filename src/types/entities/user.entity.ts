import { UserDto } from "../dto/User.dto";

export interface User extends UserDto {
    Password: string
}