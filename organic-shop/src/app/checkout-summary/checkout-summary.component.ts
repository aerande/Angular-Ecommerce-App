import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from './../shopping-cart.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-checkout-summary',
  templateUrl: './checkout-summary.component.html',
  styleUrls: ['./checkout-summary.component.css']
})
export class CheckoutSummaryComponent implements OnInit {
  products;
  @Input('totalPrice') totalPrice;
  @Input('itemCount') itemCount;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private location: Location) { }

  async ngOnInit() {
    await this.shoppingCartService.getProducts().then(products => {
      this.products = products
    });
    console.log(this.totalPrice);
  }

  goBack() {
    this.location.back();
  }
}
