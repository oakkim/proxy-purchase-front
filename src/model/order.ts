import { Goods } from './goods.js';
import { User } from './user.js';
import { OrderStatus } from './order-status.js';

export class Order {
  id!: string;
  requester!: User;
  responser!: User;
  goods: Goods[] = [];
  commission!: number;
  status!: OrderStatus;
  createdAt!: Date;
}
