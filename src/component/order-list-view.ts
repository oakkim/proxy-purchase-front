import { LitElement, html, css, property } from 'lit-element';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';

import { User } from '../model/user.js';
import { Goods } from '../model/goods.js';
import { Order } from '../model/order.js';

export class OrderListView extends LitElement {
  static styles = css`
    #order-list {
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }
  `;

  render() {
    const id: string | null = window.localStorage.getItem('user-id');

    const user = new User();
    user.name = '김대용';

    const goods1 = new Goods();
    goods1.id = 'goods-1';
    goods1.ea = 4;
    goods1.name = '초코파이';
    goods1.price = 5000;

    const goods2 = new Goods();
    goods2.id = 'goods-2';
    goods2.ea = 2;
    goods2.name = '포카칩';
    goods2.price = 1500;

    const order = new Order();
    order.id = 'a1-2-21-2-32';
    order.goods = [goods1, goods2];
    order.requester = user;
    order.commission = 1000;

    return html`
      <mwc-list id="order-list">
        <order-item .order=${order}></order-item>
        <order-item .order=${order}></order-item>
        <order-item .order=${order}></order-item>
        <order-item .order=${order}></order-item>
        <order-item .order=${order}></order-item>
      </mwc-list>
    `;
  }
}
