import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public url:string;

  constructor(private _http: HttpClient, private _userService: UserService) { 
    this.url = GLOBAL.url;
  }

  getProducts(page = null): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'products/'+page, {headers: headers});
  }

  getProduct(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'product/'+id,{headers: headers});
  }

}
