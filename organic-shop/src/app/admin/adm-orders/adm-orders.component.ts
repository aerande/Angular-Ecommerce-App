import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-adm-orders',
  templateUrl: './adm-orders.component.html',
  styleUrls: ['./adm-orders.component.css']
})
export class AdmOrdersComponent implements OnInit {
  orders;

  constructor(private orderService: OrderService) { }

  async ngOnInit() {
    await this.orderService.getOrders().take(1).subscribe(orders => this.orders = orders);
  }
}
