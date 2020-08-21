import firebase from './firebase.js';
import { Goods } from '../model/goods.js';

function createGoods(goods: Goods, callback: (g: Goods) => any) {
  return firebase
    .database()
    .ref('/goods/')
    .push({
      name: goods.name,
      price: goods.price,
      count: goods.ea,
    })
    .then(r => {
      goods.id = r.key ?? '';
      callback && callback(goods);
    });
}
//on 전체 조회
//function readGoods(callback: (g: Goods) => any){
//    firebase.database().ref('/goods/').on('child_added', (data) => {
//        data.
//    })
//}
//once 한번만 조회
function readGoodsById(id: string, callback: (g: Goods) => any) {
  firebase
    .database()
    .ref('/goods/' + id)
    .once('value', function (data) {
      const goods: Goods = new Goods();

      goods.name = data.val().name;
      goods.ea = data.val().count;
      goods.price = data.val().price;
      goods.id = data.key ?? '';
      if (callback) {
        callback(goods);
      }
    });
}

// function updateGoods(id, name, price, count) {

// }

// function removeGoods(id, name){

// }

export { createGoods, readGoodsById };
