import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

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
    path: '**',
    title: 'page not found',
    component: PageNotFoundComponent,
  },
];
