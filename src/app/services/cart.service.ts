import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Cart } from '../models/cart';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  public url: string;
  public cart;


  constructor(private _http: HttpClient, private _userService: UserService) {
    this.url = GLOBAL.url;
  }

  addToCart(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this._userService.getToken());
    return this._http.get(this.url + 'product/' + id, { headers: headers });
  }


  getItemsCart(){
    let cart = JSON.parse(sessionStorage.getItem('carts'));

    if(cart != 'undefined'){
      this.cart = cart;
    }else{
      this.cart = null;
    }

    return this.cart;
  }




}
