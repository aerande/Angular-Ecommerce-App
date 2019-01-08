import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-adm-products',
  templateUrl: './adm-products.component.html',
  styleUrls: ['./adm-products.component.css']
})
export class AdmProductsComponent implements OnInit {
  products: Product[];
  filteredProducts: any[];
  //tableResource: DataTableResource<Product>;
  //items: Product[] = [];
  //itemCount: number;

  constructor(private productService: ProductService, private router: Router) {
    this.productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;
      //this.initializeTable(products);
    });
   }

  // private initializeTable(products: Product[]) {
  //   this.tableResource = new DataTableResource(products);
  //   this.tableResource.query({ offset: 0}).then(items => this.items = items);
  //   this.tableResource.count().then(count => this.itemCount = count);
  // }

  // reloadItems(params) {
  //   if(!this.tableResource) return;
  //   this.tableResource.query(params).then(items => this.items = items);
  // }

  ngOnInit() {
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  delete(productId) {
    if(!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(productId);
    this.router.navigate(['/admin/products']);
  }
}
