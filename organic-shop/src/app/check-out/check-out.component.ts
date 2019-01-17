import { AuthService } from './../auth.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {};
  order = {};
  userId: string;
  ref;
  totalPrice: number;
  itemCount: number;
  userSubscription: Subscription;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private auth: AuthService,
    private location: Location,
    private router: Router) { }

  async ngOnInit() {
    this.userSubscription = await this.auth.user$.subscribe(user => this.userId = user.uid);
    this.ref = await this.shoppingCartService.getCartNew();
    this.ref.on("value", cart => {
      let items = cart.child('/items/').val();
      let keys = Object.keys(items);
      this.totalPrice = 0;
      this.itemCount = 0;
      for(let i=0; i<keys.length; i++) {
        let kk = keys[i];
        this.totalPrice += items[kk].quantity * items[kk].product.price;
        this.itemCount += items[kk].quantity;
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let orderId = this.orderService.createOrder();
    
    this.ref.on("value", cart => {
      let items = cart.child('/items/').val();
      let keys = Object.keys(items);
      for(let i=0; i<keys.length; i++) {
        let kk = keys[i];
        this.order = {
          product: {
            title: items[kk].product.title,
            imageUrl: items[kk].product.imageUrl,
            price: items[kk].product.price
          },
          quantity: items[kk].quantity,
          totalPrice: items[kk].quantity * items[kk].product.price
        };
        this.orderService.storeOrder(this.order, orderId);
      }
      let ship = {
        shipping: this.shipping,
        totalPrice: this.totalPrice,
        userId: this.userId
      }
      this.orderService.storeShipInfo(ship, orderId);
      this.shoppingCartService.clearCart();
      this.router.navigate(['/order-success', orderId.key]);
    });
  }

  clearForm() {
    this.shipping = {};
  }

  goBack() {
    this.location.back();
  }
}
