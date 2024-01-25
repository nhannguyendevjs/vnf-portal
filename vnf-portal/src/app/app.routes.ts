import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./views/users/users.routes').then((m) => m.routes),
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.routes').then((m) => m.routes),
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
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () => import('./views/not-found/not-found.routes').then((m) => m.routes),
  },
]
