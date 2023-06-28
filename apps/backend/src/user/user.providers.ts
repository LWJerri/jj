import { Connection } from "mongoose";
import { OrderSchema } from "src/database/schemas/Order";
import { UserSchema } from "src/database/schemas/User";

export const usersProviders = [
  {
    provide: "USER_MODEL",
    useFactory: (connection: Connection) => connection.model("User", UserSchema),
    inject: ["DATABASE_CONNECTION"],
  },
  {
    provide: "ORDER_MODEL",
    useFactory: (connection: Connection) => connection.model("Order", OrderSchema),
    inject: ["DATABASE_CONNECTION"],
  },
];
