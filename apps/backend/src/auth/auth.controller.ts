import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthorizationDto } from "./dto/authorization.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async signIn(@Body() body: AuthorizationDto) {
    return await this.authService.signIn(body);
  }

  @Post("register")
  async signUp(@Body() body: AuthorizationDto) {
    return await this.authService.signUp(body);
  }
}
