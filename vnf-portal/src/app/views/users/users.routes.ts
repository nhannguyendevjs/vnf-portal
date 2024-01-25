import { Routes } from '@angular/router'
import { UsersComponent } from './users.component'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UsersComponent,
    title: 'Users',
  },
]
