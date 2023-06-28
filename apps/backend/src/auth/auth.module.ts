import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

const { EXPIRES_IN, SECRET } = process.env;

@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: EXPIRES_IN },
      secret: SECRET,
    }),
    UsersModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
