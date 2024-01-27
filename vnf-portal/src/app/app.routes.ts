import { Routes } from '@angular/router'
import { authGuard } from './guards/auth.guard'

export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./views/users/users.routes').then((m) => m.routes),
    canActivate: [authGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.routes').then((m) => m.routes),
    canActivate: [authGuard],
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./views/sign-in/sign-in.routes').then((m) => m.routes),
  },
  {
    path: 'shell',
    loadChildren: () => import('./views/shell/shell.routes').then((m) => m.routes),
  },
  {
    path: '',
    redirectTo: 'shell',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () => import('./views/not-found/not-found.routes').then((m) => m.routes),
  },
]
