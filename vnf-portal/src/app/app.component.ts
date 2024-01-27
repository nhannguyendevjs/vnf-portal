import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { NavigationEnd, Router, RouterOutlet } from '@angular/router'
import { SwUpdate } from '@angular/service-worker'
import { TranslocoService } from '@ngneat/transloco'
import { Subject, takeUntil, timer } from 'rxjs'
import { LocalStorageKeys } from './enums/local-storage'
import { environment } from './environments/environment'
import { InnerComponent } from './layouts/inner/inner.component'
import { OuterComponent } from './layouts/outer/outer.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, OuterComponent, InnerComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  #destroy$ = new Subject<void>()

  #swUpdate = inject(SwUpdate)
  #translocoService = inject(TranslocoService)
  #router = inject(Router)

  ngOnInit() {
    this.#registerServiceWorkerUpgrade()
    this.#registerRouterEvents()
    this.#detectLocalLanguage()
  }

  #registerRouterEvents() {
    this.#router.events.pipe(takeUntil(this.#destroy$)).subscribe((navigationEvent) => {
      if (navigationEvent instanceof NavigationEnd) {
        const { urlAfterRedirects } = navigationEvent

        if (!urlAfterRedirects.includes('/sign-in')) {
          localStorage.setItem(LocalStorageKeys.lastUrl, urlAfterRedirects)
        }
      }
    })
  }

  #registerServiceWorkerUpgrade() {
    if (this.#swUpdate.isEnabled) {
      timer(0, 60000)
        .pipe(takeUntil(this.#destroy$))
        .subscribe(() => {
          this.#swUpdate.checkForUpdate().then((res) => {
            if (res) {
              if (confirm('A new version is available, do you want to load it?')) {
                window.location.reload()
              }
            }
          })
        })
    }
  }

  #detectLocalLanguage() {
    const language = localStorage.getItem('language') ?? environment.language

    this.#translocoService.setActiveLang(language)
    this.#translocoService.setFallbackLangForMissingTranslation({ fallbackLang: 'en' })
  }

  ngOnDestroy() {
    this.#destroy$.next()
    this.#destroy$.complete()
  }
}
