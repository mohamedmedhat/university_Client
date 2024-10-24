import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { ProductTableComponent } from './features/products/product-table/products.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/home/home.component').then((h) => h.HomeComponent),
  },
  {
    path: 'auth',
    children: [
      {
        path: 'register',
        title: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component').then(
            (r) => r.RegisterComponent
          ),
      },
      {
        path: 'login',
        title: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(
            (l) => l.LoginComponent
          ),
      },
    ],
  },
  {
    path: 'products',
    title: 'products',
    children: [
      {
        path: 'table',
        title: 'table',
        loadComponent: () =>
          import('./features/products/product-table/products.component').then(
            (t) => t.ProductTableComponent
          ),
      },
      {
        path: 'detail/:id',
        title: 'productDetail',
        loadComponent: () =>
          import(
            './features/products/product-detail/product-detail.component'
          ).then((d) => d.ProductDetailComponent),
      },
      {
        path: 'show',
        title: 'productCards',
        loadComponent: () =>
          import(
            './features/products/product-show/product-show.component'
          ).then((s) => s.ProductShowComponent),
      },
    ],
  },
  {
    path: '**',
    title: 'page not found',
    component: PageNotFoundComponent,
  },
];
