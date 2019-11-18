import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public url: any;
 
  constructor(private _http: HttpClient, private _orderService: OrderService, private _userService: UserService ) { 
    this.url = GLOBAL.url;
  }

  register(order: Order): Observable<any>{
    let params = JSON.stringify(order);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization', this._userService.getToken());

    return this._http.post(this.url+'order ', params, {headers: headers})
                          
  }

  getOrders(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization', this._userService.getToken());

    return this._http.get(this.url+'my-orders/'+id,{headers: headers});
  }
  
}
