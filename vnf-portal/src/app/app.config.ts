import { provideImageKitLoader } from '@angular/common'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter, withComponentInputBinding } from '@angular/router'
import { provideServiceWorker } from '@angular/service-worker'
import { provideTransloco } from '@ngneat/transloco'
import { provideStore } from '@ngrx/store'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'
import { AppInterceptor } from './app.interceptor'
import { routes } from './app.routes'
import { environment } from './environments/environment'
import { TranslocoHttpLoader } from './transloco-loader'
import { AppStore } from './utils/store/app.store'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([AppInterceptor])),
    provideRouter(routes, withComponentInputBinding()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'vi'],
        defaultLang: environment.language,
        fallbackLang: environment.language,
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideStore(AppStore),
    importProvidersFrom([NgxSkeletonLoaderModule.forRoot()]),
    provideImageKitLoader('https://ik.imagekit.io/9mx5jcsss/'),
  ],
}
