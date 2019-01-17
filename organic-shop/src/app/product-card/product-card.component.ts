import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  getQuantity() {
    if(!this.shoppingCart) return 0;
    if(this.shoppingCart.items == undefined) return 0;
    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }
}
