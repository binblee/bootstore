import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ProductOrders} from "../models/product-orders.model";
import {Subscription} from "rxjs";
import {StoreService} from "../services/StoreService";
import {ProductOrder} from "../models/product-order.model";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy{

  orderFinished: boolean;
  orders: ProductOrders;
  total: number;
  sub: Subscription;

  @Output() onOrderFinished: EventEmitter<boolean>;

  constructor(private storeServie: StoreService) {
    this.total = 0;
    this.orderFinished = false;
    this.onOrderFinished = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.orders = new ProductOrders();
    this.loadCart();
    this.loadTotal();
  }

  loadTotal(){
    this.sub = this.storeServie.OrdersChanged.subscribe(() =>{
      this.total = this.calculateTotal(this.orders.productOrders);
    });
  }

  loadCart(){
    this.sub = this.storeServie.ProductOrderChanged.subscribe(()=>{
      let productOrder = this.storeServie.SelectedProductOrder;
      if(productOrder){
        this.orders.productOrders.push(new ProductOrder(
          productOrder.product, productOrder.quantity
        ));
      }
      this.storeServie.ProductOrders = this.orders;
      this.orders = this.storeServie.ProductOrders;
      this.total = this.calculateTotal(this.orders.productOrders);
    });
  }

  private calculateTotal(products: ProductOrder[]): number {
    let sum = 0;
    products.forEach(value => {
      sum += (value.product.price * value.quantity);
    });
    return sum;
  }

  finishOrder() {
    this.orderFinished = true;
    this.storeServie.Total = this.total;
    this.onOrderFinished.emit(this.orderFinished);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  reset() {
    this.orderFinished = false;
    this.orders = new ProductOrders();
    this.orders.productOrders = []
    this.loadTotal();
    this.total = 0;
  }
}
