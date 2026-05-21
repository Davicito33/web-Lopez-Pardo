import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { Sitios } from './pages/sitios/sitios';
import { Preview } from './pages/preview/preview';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
    path: 'sitios',
    component: Sitios,
    canActivate: [authGuard]
  },

  {
    path: 'preview/:id',
    component: Preview,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: ''
  }

];