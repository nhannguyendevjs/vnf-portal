import { inject } from '@angular/core'
import { Router, CanActivateFn } from '@angular/router'

export const authGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router)

  const accessToken = localStorage.getItem('authorization')

  if (!accessToken) {
    router.navigate(['/sign-in'])
    return false
  }

  return true
}
