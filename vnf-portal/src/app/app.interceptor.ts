import { HttpHandlerFn, HttpRequest } from '@angular/common/http'

export function AppInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const clonedRequest = req.clone({
    headers: req.headers.set('Authorization', localStorage.getItem('token') ?? ''),
  })
  return next(clonedRequest)
}
