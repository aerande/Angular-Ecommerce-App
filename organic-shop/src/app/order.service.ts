import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  createOrder() {
    return this.db.list('/orders/').push({
      datePlaced: new Date().getTime()
    });
  }

  private getOrder(orderId) {
    return firebase.database().ref('/orders/' + orderId.key + '/items/');
  }

  getOrders() {
    return this.db.list('/orders/').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
    });
  }

  async storeOrder(order, orderId) {
    let ref = await this.getOrder(orderId);
    ref.push(order);
  }

  storeShipInfo(ship, orderId) {
    let ref = firebase.database().ref('/orders/' + orderId.key);
    ref.update(ship);
  }

  getOrdersByUser(userId: string) {
    // return firebase.database().ref('/orders/')
    // .orderByChild("userId")
    // .equalTo(userId);

    return this.db.list('/orders', ref => ref.orderByChild("userId").equalTo(userId)).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
    });
  }
}
