import { ProductService } from './../../product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  id;
  product = {};

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService) {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.getProduct(this.id).take(1).subscribe(p => this.product = p);
   }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }
}
