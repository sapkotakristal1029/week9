import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { AddProductsComponent } from './components/add-products/add-products.component';

export const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'products/add', component: AddProductsComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];
