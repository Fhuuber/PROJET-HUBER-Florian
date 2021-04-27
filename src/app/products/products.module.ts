import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { FilterComponent } from '../filter/filter.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProductsComponent
  },
  {
    path: ':id/detail',
    loadChildren: () => import('../product-detail/product-detail.module').then(mod => mod.ProductDetailModule)
  }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ProductsModule { }
