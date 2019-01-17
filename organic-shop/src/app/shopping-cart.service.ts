import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts/').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges();
  }

  async getCartNew() {
    let cartId = await this.getOrCreateCartId();
    return firebase.database().ref('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string) {
    return firebase.database().ref('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async getProducts() {
    let cartId = await this.getOrCreateCartId();
    return this.db.list('/shopping-carts/' + cartId + '/items/').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
    });
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItemQuantityNeg(product, -1);
  }

  async removeItemFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).remove();
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let ref = this.getItem(cartId, product.key);
    ref.once("value", item => {
      if(item.exists()) ref.update({ quantity: item.val().quantity + change});
      else ref.update({"product": product, "quantity": 1});
    });
  }

  private async updateItemQuantityNeg(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let ref = this.getItem(cartId, product.key);
    ref.once("value", item => {
      if(item.exists()) {
        ref.update({ quantity: item.val().quantity + change});
        if(item.val().quantity == 1) this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).remove();
      }
      else ref.update({"product": product, "quantity": 1});
    });
  }
}
