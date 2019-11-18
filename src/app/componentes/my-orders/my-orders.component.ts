import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  public orders: Array<Order>;
  public numero:number;
  public total: number;
  constructor(private _orderService: OrderService, private _userService: UserService) { }

  ngOnInit() {
    this.numero =1;
    this.orders = []
    this._orderService.getOrders(this._userService.getIdentity()._id).subscribe(
      orders =>{
        this.orders = orders.orders;
        console.log(orders);
      },
      error =>{
        console.log(error);
      }

    )
  }

  calcularGranTotal(): number {
    this.total = 0;
    this.orders.forEach((item: Order) => {
      item.carts.forEach(cart=>{
        this.total += cart.importe;
      })
    })
    return this.total;
  }

}
