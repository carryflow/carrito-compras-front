import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { registerLocaleData } from '@angular/common';


@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  public carts: any[];
  public total:number;
  public order: Order;
  constructor(private _carService: CartService, private _userService: UserService, private _orderService: OrderService,  private _route: ActivatedRoute, private _router: Router) {
    this.order = new Order(null, [], '', '');
  }

  ngOnInit() {
    this.loadStripe();
    this.carts = this._carService.getItemsCart();
  }

  loadStripe() {

    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }
  }

  pay(amount) {
    let gettoken;
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_FZlVDUgWGPf2v0cdrpoAEZQq0018LppT1V',
      locale: 'auto',
      token: (token: any)=>{
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token.id)
        alert('Token Created!!');
        this.register(token)
      }
    });

    
    

    handler.open({
      name: 'Checkout tienda virtual',
      description: 'ingrese datos',
      amount: amount * 100
    });

  }

  register(token) {
    console.log('toeknnnnn'+token.id);
    this.order.user = this._userService.getIdentity();
    this.order.carts = this._carService.getItemsCart();
    this.order.email = token.email;
    this.order.paymentId = token.id;
    console.log("id"+ this.order.paymentId);
    this._orderService.register(this.order).subscribe(
      response => {
        console.log("desde aqui" + response)
      },
      error => {
        console.log(error);
      }
    );
  }



  actualizarCantidad(id, event: any): void {
    let cantidad: number = event.target.value as number;

    if (cantidad == 0) {
      return this.eliminarItemCart(id);
    }

    this.carts = this.carts.map((item: Cart) => {
      if (id === item.product._id) {
        item.qty = cantidad;
        item.importe = item.product.price * item.qty;
      }
      return item;
    });
    sessionStorage.setItem("carts", JSON.stringify(this.carts));

  }

  eliminarItemCart(id): void {
    this.carts = this.carts.filter((item: Cart) => id !== item.product._id);
    sessionStorage.setItem("carts", JSON.stringify(this.carts));
  }

  calcularGranTotal(): number {
    this.total = 0;
    this.carts.forEach((item: Cart) => {
      this.total += item.importe;
    });
    return this.total;
  }

}
