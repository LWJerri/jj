import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { UserController } from "./user.controller";
import { usersProviders } from "./user.providers";
import { UserService } from "./user.service";

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...usersProviders],
  exports: [UserService],
  controllers: [UserController],
})
export class UsersModule {}
