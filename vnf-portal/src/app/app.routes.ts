import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'sign-in',
    loadChildren: () => import('./views/sign-in/sign-in.routes').then((m) => m.routes),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./views/dashboard/dashboard.routes').then((m) => m.routes),
  },
  {
    path: 'shell',
    loadChildren: () => import('./views/shell/shell.routes').then((m) => m.routes),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () => import('./views/not-found/not-found.routes').then((m) => m.routes),
  },
]
