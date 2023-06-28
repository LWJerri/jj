import { Body, Controller, Get, Post, Query, Request, UseGuards } from "@nestjs/common";
import { OrdersQueryDto, OrdersQueryPipe } from "./dto/ordersQuery.dto";
import { NewRequestDto } from "./dto/request.dto";
import { UserRequest } from "./types/UserRequest";
import { AuthGuard } from "./user.guard";
import { UserService } from "./user.service";

@Controller("user")
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get("me")
  async getMe(@Request() req: UserRequest) {
    return await this.userService.getMe(req);
  }

  @Get("orders")
  async getOrders(@Request() req: UserRequest, @Query(new OrdersQueryPipe()) page: OrdersQueryDto) {
    return await this.userService.getOrders(req, Number(page));
  }

  @Post("order")
  async createOrder(@Body() body: NewRequestDto, @Request() req: UserRequest) {
    return await this.userService.createOrder(body, req);
  }
}
