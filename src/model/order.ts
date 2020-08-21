import { Goods } from './goods.js';
import { User } from './user.js';

export class Order {
    id!: string;
    requestee!: User;
    acceptor!: User;
    goods!: Goods[];
    fee!: number;
}