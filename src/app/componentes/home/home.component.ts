import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { QueryValueType } from '@angular/compiler/src/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public product: Product;
  public identity;
  public token;
  public page;
  public next_page;
  public prev_page;
  public status: string;
  public total;
  public pages;
  public products: Product[];

  public cart: Cart;
  public items: Cart[] =  [];
  public importe;
  public qty;

  constructor(private _productService: ProductService, private _cartService: CartService, public _userService: UserService, private _route: ActivatedRoute, private _router: Router) {
    this.product = new Product("", "", "", "", 0);
    this.cart = new Cart(null, 1, 0);
    this.qty = 1;
  }

  ngOnInit() {
    this.actualPage();
  }

  actualPage() {
    this._route.params.subscribe(params => {
      let page = +params['page'];
      this.page = page;

      if (!params['page']) {
        page = 1;
      }

      if (!page) {
        page = 1;
      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;
        if (this.prev_page <= 0) {
          this.prev_page = 1;
        }
      }

      // devolver listado de productos
      this.getProducts(page);

    });
  }

  getProducts(page) {
    this._productService.getProducts(page).subscribe(
      response => {
        if (!response.products) {
          this.status = 'error';
        } else {
          this.total = response.total;
          this.products = response.products;
          this.pages = response.pages;

          if (page > this.pages) {
            this._router.navigate(['/home', 1]);
          }
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  addToCart(id) {
    if(this._userService.getIdentity()){
      this._cartService.addToCart(id).subscribe(
        response => {
  
          if (this.existeItem(id)) {
            console.log("existe");
            this.incrementaCantidad(id);
          } else {
            let nuevoItem = new Cart(response, this.cart.qty, this.cart.importe);
            nuevoItem.product = response.product;
            nuevoItem.importe = nuevoItem.product.price * nuevoItem.qty;
            console.log(nuevoItem);
            this.items = this.items || [];
            this.items.push(nuevoItem);
            sessionStorage.setItem("carts", JSON.stringify(this.items));
          }
          console.log(this.items)
        },
        error => {
          console.log(<any>error);
        }
      );
    }else{
      this._router.navigate(['/login']);
    }
    
  }

  existeItem(id): boolean {
    let existe = false;
    this.items.forEach((item: Cart) => {
      if (id === item.product._id) {
        existe = true
      }
    });
    this.items = this._cartService.getItemsCart();
    return existe;
  }

  incrementaCantidad(id): void {
    this.items = this.items.map((item: Cart) => {
      if (id === item.product._id) {
        ++item.qty
        item.importe = item.product.price * item.qty
      }
      sessionStorage.setItem("carts", JSON.stringify(this.items));
      return item;
    });
  }


}
