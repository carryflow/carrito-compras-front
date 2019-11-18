import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  public identity;
  public cart;
  constructor(private _userService: UserService, private _cartService:CartService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.cart = this._cartService.getItemsCart();
    
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
    this.cart = this._cartService.getItemsCart();

  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.identity = null;
    this.cart = null;
    this._router.navigate(['/']);
  }

}
