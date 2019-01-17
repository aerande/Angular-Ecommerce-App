import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItemCount: number;
  shoppingCart;
  products;
  totalPrice: number;
  btnCheck;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    await this.shoppingCartService.getProducts().then(products => {
      this.products = products
    });

    let ref = await this.shoppingCartService.getCartNew();
    ref.on("value", cart => {
      this.shoppingCartItemCount = 0;
      this.totalPrice = 0;
      this.shoppingCart = cart.key;
      this.btnCheck = cart.child('/items/').exists();
      if(!cart.child('/items/').exists()) {
        this.shoppingCartItemCount = 0; 
        return;
      }
      let getQuantity = cart.child('/items/').val();
      let keys = Object.keys(getQuantity);
			for (let i=0; i<keys.length; i++) {
        let k = keys[i];
        this.shoppingCartItemCount += getQuantity[k].quantity;
        this.totalPrice += getQuantity[k].quantity * getQuantity[k].product.price;
      }
		});
  }

  addToCart(product) {
    this.shoppingCartService.addToCart(product);
  }

  removeFromCart(product) {
    this.shoppingCartService.removeFromCart(product);
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

  removeItemFromCart(product) {
    this.shoppingCartService.removeItemFromCart(product);
  }
}
