import { IsAlphanumeric, IsString, MaxLength, MinLength } from "class-validator";

export class AuthorizationDto {
  @IsAlphanumeric()
  @MinLength(4)
  @MaxLength(16)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
