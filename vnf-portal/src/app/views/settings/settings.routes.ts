import { Routes } from '@angular/router'
import { SettingsComponent } from './settings.component'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SettingsComponent,
    title: 'Settings',
  },
]
