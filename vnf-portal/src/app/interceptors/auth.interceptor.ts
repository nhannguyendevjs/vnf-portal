import { HttpErrorResponse, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { catchError } from 'rxjs'

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const router = inject(Router)

  return next(req).pipe(
    catchError((event) => {
      if (event instanceof HttpErrorResponse && event.status === 401) {
        router.navigate(['/sign-in'])
      }

      return event
    })
  ) as any
}
