import { AuthService } from "../services";
import { ICommonResponse, IUser, IUserRequestDto } from "../types";
import { Body, Controller, Get, Post, Route } from "tsoa";

@Route("api/auth")
export class AuthController extends Controller {
  @Get("/users")
  public async users(): Promise<ICommonResponse<IUser[]>> {
    let _authService = new AuthService();
    let resData = await _authService.getAll();
    this.setStatus(resData.status);
    return resData;
  }
  @Post("/signup")
  public async signUp(@Body() req: IUserRequestDto): Promise<ICommonResponse<{}>> {
    let _authService = new AuthService();
    let resData = await _authService.signup(req);
    this.setStatus(resData.status);
    return resData;
  }
}
