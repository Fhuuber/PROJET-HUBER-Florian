import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ErrorComponent } from './error/error.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { LoginComponent } from './login/login.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';

const routes: Routes = [
  { 
    path: '',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
  },
  { 
    path: 'home', 
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
  },
  { 
    path: 'products',
    loadChildren: () => import('./products/products.module').then(mod => mod.ProductsModule),
  },
  { 
    path: 'cart',
    canActivate: [AuthGuard],
    loadChildren: () => import('./cart/cart.module').then(mod => mod.CartModule) 
  },
  { 
    path: 'account/signUp',
    canActivate: [AuthGuard],
    component:FormulaireComponent
  },
  { 
    path: 'account/login',
    canActivate: [AuthGuard],
    component:LoginComponent
  },
  { 
    path: 'paymentSuccess',
    canActivate: [AuthGuard],
    component:PaymentSuccessComponent
  },
  { 
    path: 'not-found', 
    component: ErrorComponent
  },{
    path: '**',
    redirectTo: 'not-found'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
