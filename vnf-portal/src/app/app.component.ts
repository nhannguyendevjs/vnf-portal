import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { NavigationStart, Router, RouterOutlet } from '@angular/router'
import { SwUpdate } from '@angular/service-worker'
import { TranslocoService } from '@ngneat/transloco'
import { Subject, takeUntil, timer } from 'rxjs'
import { environment } from './environments/environment'
import { InnerComponent } from './layouts/inner/inner.component'
import { OuterComponent } from './layouts/outer/outer.component'
import { AppSelectors } from './stores/app-selector'
import { CommonModule } from '@angular/common'

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
      if (navigationEvent instanceof NavigationStart) {
        // TODO handle navigation start event
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
