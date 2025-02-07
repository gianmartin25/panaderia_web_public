import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { SuccessComponent } from './checkout/success/success.component';
import { OrdersComponent } from './orders/orders/orders.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/features/product-shell/product.route'),
  },
  { path: 'cart', loadChildren: () => import('./cart/cart.routes') },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.routes'),
  },
  {
    path: 'success',
    component: SuccessComponent,
  },{
    path:'cancel',
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
