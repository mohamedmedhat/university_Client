import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { HomeComponent } from './features/home/home.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { ProductTableComponent } from './features/products/product-table/products.component';

export const routes: Routes = [
  {
    path: '',
    title: 'home',
    component: HomeComponent,
  },
  {
    path: 'register',
    title: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    title: 'login',
    component: LoginComponent,
  },
  {
    path: 'products',
    title: 'products',
    component: ProductTableComponent,
  },
  {
    path: 'product-detail/:id',
    title: 'productDetail',
    component: ProductDetailComponent,
  },
  {
    path: '**',
    title: 'page not found',
    component: PageNotFoundComponent,
  },
];
