import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component'
import { NavListComponent } from '../../components/nav-list/nav-list.component'

@Component({
  selector: 'app-outer',
  standalone: true,
  imports: [CommonModule, NavBarComponent, NavListComponent],
  templateUrl: './outer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OuterComponent {}
