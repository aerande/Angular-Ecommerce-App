import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  // getAll() {
  //   return this.db.list('/products').snapshotChanges().map(changes => {
  //     return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
  //   });
  // }

  getAll(): Observable<Product[]> {
    return this.db.list('/products')
    .snapshotChanges()
    .map(changes => {
      return changes.map(c => { 
        const data = c.payload.val() as Product;
        const key = c.payload.key;
        return {key, ...data};
      })
    });
  }

  getProduct(productId) {
    return this.db.object('/products/' + productId).snapshotChanges()
    .map(res => {
      return res.payload.val();
    });
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
