import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if(!this.shoppingCart) return 0;

    let keyString = this.product.key;
    let item = this.shoppingCart.items[keyString];
    return item ? item.quantity : 0;

    //console.log(this.product.key);
    //console.log(this.shoppingCart);
    // let kk = this.product.key.toString();
    // console.log(kk);
    // console.log(this.shoppingCart.items[this.product.key]);
  }
}
