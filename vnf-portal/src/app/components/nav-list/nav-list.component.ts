import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-nav-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavListComponent {
  readonly navItems = [
    {
      label: 'Home',
      path: '/home',
      selected: true,
    },
    {
      label: 'Users',
      path: '/users',
      selected: false,
    },
    {
      label: 'Settings',
      path: '/settings',
      selected: false,
    },
  ]
}
