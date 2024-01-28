import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu'
import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnDestroy, inject, signal } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import { Subject, takeUntil } from 'rxjs'
import * as UserActions from '../../stores/actions/user.actions'
import { AppSelectors } from '../../stores/app-selector'
import { AppStore } from '../../stores/schemas/store.schema'
import * as AuthSchemas from '../../types/auth'

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, CdkMenuTrigger, CdkMenu, CdkMenuItem],
  templateUrl: './nav-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnDestroy {
  #router = inject(Router)
  #appStore = inject(Store) as Store<AppStore>

  #destroy$ = new Subject<void>()

  currentUser = signal<AuthSchemas.User>(null)

  constructor() {
    AppSelectors()
      .user.pipe(takeUntil(this.#destroy$))
      .subscribe((user) => {
        this.currentUser.set(user)
      })
  }

  signOut() {
    localStorage.clear()
    this.#appStore.dispatch(UserActions.resetUser())
    this.#router.navigate(['/sign-in'])
  }

  ngOnDestroy() {
    this.#destroy$.next()
    this.#destroy$.complete()
  }
}
