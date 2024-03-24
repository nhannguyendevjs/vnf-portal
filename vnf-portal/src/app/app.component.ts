import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import hotkeys from 'hotkeys-js';
import { timer } from 'rxjs';
import { HotkeysDialogComponent } from './components/hotkeys-dialog/hotkeys-dialog.component';
import { LocalStorageKeys } from './enums/local-storage';
import { environment } from './environments/environment';
import { InnerComponent } from './layouts/inner/inner.component';
import { OuterComponent } from './layouts/outer/outer.component';
import { AuthService } from './services/auth.service';
import * as UserActions from './stores/actions/user.actions';
import { AppSelectors } from './stores/app-selector';
import { AppStore } from './types/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, OuterComponent, InnerComponent, HotkeysDialogComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  #swUpdate = inject(SwUpdate);
  #translocoService = inject(TranslocoService);
  #router = inject(Router);
  #authService = inject(AuthService);
  #appStore = inject(Store) as Store<AppStore>;
  #destroyRef = inject(DestroyRef);

  isSignedIn = signal(this.#authService.isSignedIn());

  hotkeysDialog = viewChild.required<HotkeysDialogComponent>('hotkeysDialog');

  constructor() {
    this.#registerServiceWorkerUpgrade();
    this.#registerRouterEvents();
    this.#detectLocalLanguage();
    this.#registerStoreUser();
    this.#loadCurrentUser();
    this.#registerHotkeys();
  }

  #registerStoreUser() {
    AppSelectors()
      .user.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((user) => {
        this.isSignedIn.set(!!user);
      });
  }

  #loadCurrentUser() {
    if (this.#authService.isSignedIn()) {
      this.#authService.me().subscribe((res) => {
        if (res.success) {
          const user = res.data;
          this.#appStore.dispatch(UserActions.setUser(user));
        }
      });
    }
  }

  #registerRouterEvents() {
    this.#router.events.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((navigationEvent) => {
      if (navigationEvent instanceof NavigationEnd) {
        const { urlAfterRedirects } = navigationEvent;

        if (!urlAfterRedirects.includes('/sign-in')) {
          localStorage.setItem(LocalStorageKeys.lastUrl, urlAfterRedirects);
        }
      }
    });
  }

  #registerServiceWorkerUpgrade() {
    if (this.#swUpdate.isEnabled) {
      timer(0, 60000)
        .pipe(takeUntilDestroyed())
        .subscribe(() => {
          this.#swUpdate.checkForUpdate().then((res) => {
            if (res) {
              if (confirm('A new version is available, do you want to load it?')) {
                window.location.reload();
              }
            }
          });
        });
    }
  }

  #detectLocalLanguage() {
    const language = localStorage.getItem('language') ?? environment.language;

    this.#translocoService.setActiveLang(language);
    this.#translocoService.setFallbackLangForMissingTranslation({ fallbackLang: 'en' });
  }

  #registerHotkeys() {
    // Home page
    hotkeys('ctrl+h, command+h', (event, _handler) => {
      event.preventDefault();
      this.#router.navigate(['/home']);
    });

    // Users page
    hotkeys('ctrl+u, command+u', (event, _handler) => {
      event.preventDefault();
      this.#router.navigate(['/users']);
    });

    // Settings page
    hotkeys('ctrl+s, command+s', (event, _handler) => {
      event.preventDefault();
      this.#router.navigate(['/settings']);
    });

    // Hotkeys dialog
    hotkeys('ctrl+k, command+k, shift+/', (event, _handler) => {
      event.preventDefault();
      this.hotkeysDialog().showDialog();
    });
  }
}
