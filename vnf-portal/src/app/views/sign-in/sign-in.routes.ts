import { Routes } from '@angular/router'
import { ShellComponent } from './shell.component'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ShellComponent,
    title: 'Shell',
  },
]
