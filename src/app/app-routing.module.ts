import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { CheckOutComponent } from './main/check-out/check-out.component';
import { LoginComponent } from './main/login/login.component';
import { MyOrdersComponent } from './main/my-orders/my-orders.component';
import { OrderSuccessComponent } from './main/order-success/order-success.component';
import { ProductsComponent } from './main/products/products.component';
import { ShopingCartComponent } from './main/shoping-cart/shoping-cart.component';
import { AdmingAuthGuardService as AdmingAuthGuard } from './services/adming-auth-guard.service';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'products', pathMatch: 'full', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'shoping-cart', component: ShopingCartComponent },
  // user
  { path: 'chack-out', component: CheckOutComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'order-success/:id', component: OrderSuccessComponent },
  // admin
  { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdmingAuthGuard] },
  { path: 'admin/dashboard/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdmingAuthGuard] },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, AdmingAuthGuard] },
  { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdmingAuthGuard] },
  { path: '**', redirectTo: 'products' }
];
// { path: '**', redirectTo: '' } 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
