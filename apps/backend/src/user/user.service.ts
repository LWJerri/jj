import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { NewRequestDto } from "./dto/request.dto";
import { Order, User, UserRequest } from "./types";

@Injectable()
export class UserService {
  constructor(
    @Inject("USER_MODEL") private userModel: Model<User>,
    @Inject("ORDER_MODEL") private orderModel: Model<Order>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username });
  }

  async addOne(username: string, password: string): Promise<User> {
    return await this.userModel.create({ username, password });
  }

  async getMe(req: UserRequest) {
    const [user, ordersCount] = await Promise.all([
      this.userModel.findById(req.user.id).select("username"),
      this.orderModel.count({ user: req.user.id }),
    ]);

    return { user, ordersCount };
  }

  async getOrders(req: UserRequest, page: number) {
    const pageSize = 50;

    const orders = await this.orderModel
      .find({ user: req.user.id })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .select(["user", "from", "to", "weight", "fullName", "phone", "createdAt"])
      .sort({ createdAt: "desc" });

    const count = await this.orderModel.countDocuments({ user: req.user.id });

    const totalPages = Math.ceil(count / pageSize);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return { totalPages, hasNextPage, hasPreviousPage, orders };
  }

  async createOrder(body: NewRequestDto, req: UserRequest) {
    const { from, fullName, phone, to, weight } = body;

    const { _id } = await this.orderModel.create({ from, fullName, phone, to, weight, user: req.user.id });

    const getOrder = await this.orderModel
      .findById(_id)
      .populate("user", ["username"])
      .select(["from", "to", "weight", "fullName", "phone", "createdAt"]);

    return getOrder;
  }
}
