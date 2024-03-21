import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserActions from '../../stores/actions/user.actions';
import { AppSelectors } from '../../stores/app-selector';
import * as AuthTypes from '../../types/auth';
import { AppStore } from '../../types/store';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, CdkMenuTrigger, CdkMenu, CdkMenuItem],
  templateUrl: './nav-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  #router = inject(Router);
  #appStore = inject(Store) as Store<AppStore>;
  destroyRef = inject(DestroyRef);

  currentUser = signal<AuthTypes.User>(null);

  constructor() {
    AppSelectors()
      .user.pipe(takeUntilDestroyed())
      .subscribe((user) => {
        this.currentUser.set(user);
      });
  }

  signOut() {
    localStorage.clear();
    this.#appStore.dispatch(UserActions.resetUser());
    this.#router.navigate(['/sign-in']);
  }
}
