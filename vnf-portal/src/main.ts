import { enableProdMode } from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser'
import { AppComponent } from './app/app.component'
import { appConfig } from './app/app.config'
import { environment } from './app/environments/environment'

if (environment.production) {
  enableProdMode()

  console.log = function () {}
  console.warn = function () {}
  console.info = function () {}
  console.error = function () {}
}

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err))
