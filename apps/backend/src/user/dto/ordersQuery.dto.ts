import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { Type, plainToInstance } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class OrdersQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public readonly page: number;
}

@Injectable()
export class OrdersQueryPipe implements PipeTransform {
  async transform({ page }: OrdersQueryDto, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return page;
    }

    return plainToInstance(metatype, page);
  }
}
