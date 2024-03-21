import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SignInComponent,
    title: 'Sign in',
  },
];
