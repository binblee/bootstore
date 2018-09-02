import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ProductOrders} from "../models/product-orders.model";
import {StoreService} from "../services/StoreService";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: ProductOrders;
  total: number;
  paid: boolean;
  sub: Subscription;

  constructor(private storeService: StoreService) {
    this.orders = this.storeService.ProductOrders;
  }

  ngOnInit() {
    this.paid = false;
    this.sub = this.storeService.OrdersChanged.subscribe(()=>{
      this.orders = this.storeService.ProductOrders;
    });
    this.loadTotal();
  }

  pay(){
    this.paid = true;
    this.storeService.saveOrder(this.orders).subscribe();
  }

  loadTotal() {
    this.sub = this.storeService.TotalChanged.subscribe(() => {
      this.total = this.storeService.Total;
    });
  }

}
