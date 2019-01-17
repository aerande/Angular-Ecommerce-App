import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders;
  userId: string;

  constructor(
    private auth: AuthService,
    private orderService: OrderService) { }

  async ngOnInit() {
    await this.auth.user$.subscribe(u => this.userId = u.uid);
    this.orderService.getOrdersByUser(this.userId).take(1).subscribe(orders => this.orders = orders);
  }
}
