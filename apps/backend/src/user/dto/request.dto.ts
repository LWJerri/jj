import { IsInt, IsPhoneNumber, IsString, Max, Min } from "class-validator";

export class NewRequestDto {
  @IsString()
  public readonly from: string;

  @IsString()
  public readonly to: string;

  @IsInt()
  @Min(1)
  @Max(100)
  public readonly weight: number;

  @IsString()
  public readonly fullName: string;

  @IsPhoneNumber("UA")
  public readonly phone: string;
}
