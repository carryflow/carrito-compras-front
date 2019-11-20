import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
// Import your library
import { NgxStripeModule } from 'ngx-stripe';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { MyCartComponent } from './componentes/my-cart/my-cart.component';
import { CheckoutComponent } from './componentes/checkout/checkout.component';
import { MyOrdersComponent } from './componentes/my-orders/my-orders.component';
import { ProductDetailComponent } from './componentes/product-detail/product-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MyCartComponent,
    CheckoutComponent,
    MyOrdersComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_FZlVDUgWGPf2v0cdrpoAEZQq0018LppT1V'),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
