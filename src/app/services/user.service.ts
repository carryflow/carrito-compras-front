import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { GLOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url:string;
  public identity;
  public token;

  constructor(
     public _http: HttpClient
  ) { 
    this.url = GLOBAL.url;
  }

  register(user: User): Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'register', params, {headers: headers});
  }

  singup(user:any, gettoken = null): Observable<any>{
    if(gettoken != null){
      user.gettoken = gettoken;
    }
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'login', params, {headers: headers});

  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));

    if(identity != 'undefined'){
      this.identity = identity;
    }else{
      this.identity = null;
    }

    return this.identity;
  }

  getToken(){
    let token = JSON.parse(localStorage.getItem('token'));

    if(token != 'undefined'){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }
}
