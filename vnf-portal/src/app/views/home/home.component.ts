import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnDestroy, signal } from '@angular/core'
import { Subject, takeUntil } from 'rxjs'
import { AppSelectors } from '../../stores/app-selector'
import * as AuthSchemas from '../../types/auth'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnDestroy {
  #destroy$ = new Subject<void>()

  currentUser = signal<AuthSchemas.User>(null)

  constructor() {
    AppSelectors()
      .user.pipe(takeUntil(this.#destroy$))
      .subscribe((user) => {
        this.currentUser.set(user)
      })
  }

  ngOnDestroy() {
    this.#destroy$.next()
    this.#destroy$.complete()
  }
}
