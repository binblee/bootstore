import {Injectable} from "@angular/core";
import {ProductOrder} from "../models/product-order.model";
import {ProductOrders} from "../models/product-orders.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class StoreService {
  private productsUrl = "api/products";
  private ordersUrl = "api/orders";

  private _productOrder: ProductOrder;
  private _orders: ProductOrders = new ProductOrders();

  private productOrderSubject = new Subject();
  private ordersSubject = new Subject();
  private totalSubject = new Subject();

  private _total: number;

  ProductOrderChanged = this.productOrderSubject.asObservable();
  OrdersChanged = this.ordersSubject.asObservable();
  TotalChanged = this.totalSubject.asObservable();

  constructor(private http: HttpClient){
  }

  getAllProducts(){
    return this.http.get(this.productsUrl);
  }

  saveOrder(order: ProductOrders){
    return this.http.post(this.ordersUrl, order);
  }

  set SelectedProductOrder(value: ProductOrder){
    this._productOrder = value;
    this.productOrderSubject.next();
  }

  get SelectedProductOrder(){
    return this._productOrder;
  }

  get ProductOrders() {
    return this._orders;
  }

  set ProductOrders(value: ProductOrders) {
    this._orders = value;
    this.ordersSubject.next();
  }

  get Total(){
    return this._total;
  }

  set Total(value: number){
    this._total = value;
    this.totalSubject.next();
  }

}



