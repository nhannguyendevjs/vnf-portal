import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu'
import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
import { AppSelectors } from '../../stores/app-selector'
import { AuthUser } from '../../types/auth'

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, CdkMenuTrigger, CdkMenu, CdkMenuItem],
  templateUrl: './nav-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnDestroy {
  #destroy$ = new Subject<void>()

  currentUser!: AuthUser

  constructor() {
    AppSelectors()
      .user.pipe(takeUntil(this.#destroy$))
      .subscribe((user) => {
        this.currentUser = user
      })
  }

  ngOnDestroy() {
    this.#destroy$.next()
    this.#destroy$.complete()
  }
}
