import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public product: Product;

  constructor(private _router:Router, private _route:ActivatedRoute, private _productService: ProductService, private _cartService: CartService, public _userService: UserService,) { 
    this.product = new Product('','','','',null);
  }

  ngOnInit() {
    let id = this._route.snapshot.params.id;
    this._productService.getProduct(id).subscribe(
      response =>{
        this.product = response.product;
      },
      error => {
        console.log(error);
      }
    );
  }

}
