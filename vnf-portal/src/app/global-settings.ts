import { environment } from './environments/environment'

export const GlobalSettings = {
  production: environment.production,
  version: environment.version,
  apiUrl: 'http://localhost:8080',
  apiVersion: environment.apiVersion,
  startupUrl: environment.startupUrl,
  language: environment.language,
} as const
