import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserService } from "../user/user.service";
import { AuthorizationDto } from "./dto/authorization.dto";

const { SECRET, EXPIRES_IN } = process.env;

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn({ username, password }: AuthorizationDto) {
    const findUser = await this.UserService.findOne(username);

    if (!findUser) throw new NotFoundException("Користувач з таким ніком не знайдений!");

    const isValidPassword = await bcrypt.compare(password, findUser.password);

    if (!isValidPassword) throw new UnauthorizedException("Вказаний не вірний пароль!");

    const jwtToken = await this.jwtService.signAsync(
      { id: findUser._id, username: findUser.username },
      { secret: SECRET, expiresIn: EXPIRES_IN },
    );

    return { access_token: jwtToken };
  }

  async signUp({ username, password }: AuthorizationDto) {
    const findUser = await this.UserService.findOne(username);

    if (findUser?.username?.toLowerCase() === username.toLowerCase()) {
      throw new ConflictException("Користувач з таким ніком вже зареєстрований!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.UserService.addOne(username, hashedPassword);

    const jwtToken = await this.jwtService.signAsync(
      { id: newUser._id, username: newUser.username },
      { secret: SECRET, expiresIn: EXPIRES_IN },
    );

    return { access_token: jwtToken };
  }
}
