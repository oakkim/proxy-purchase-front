import firebase from './firebase.js';
import { Order } from '../model/order.js';

function requestCreate(order: Order) {
  return firebase
    .database()
    .ref('/request/')
    .push({
      Goods: order.goods.map(g => g.id),
      Commission: order.commission,
      Requester: order.requester.id,
      Responser: order.responser.id,
      DateTime: order.createdAt,
      Status: order.status.toString(),
    });
}

export { requestCreate };
