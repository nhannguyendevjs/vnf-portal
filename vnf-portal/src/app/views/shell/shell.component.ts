import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ShellActions } from '../../enums/shell'

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  #route = inject(ActivatedRoute)

  constructor() {
    const params: any = this.#route.snapshot.queryParams

    if (params.action === ShellActions.signIn) {
      // TODO
    }

    if (params.action === ShellActions.signOut) {
      // TODO
    }

    if (params.action === ShellActions.redirect) {
      // TODO
    }
  }
}
