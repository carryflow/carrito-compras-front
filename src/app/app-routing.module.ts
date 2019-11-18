import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { MyCartComponent } from './componentes/my-cart/my-cart.component';
import { CheckoutComponent } from './componentes/checkout/checkout.component';
import { MyOrdersComponent } from './componentes/my-orders/my-orders.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/:page', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'my-cart', component: MyCartComponent },
  { path: 'checkout/:checkout', component: CheckoutComponent },
  { path: 'my-orders', component: MyOrdersComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
