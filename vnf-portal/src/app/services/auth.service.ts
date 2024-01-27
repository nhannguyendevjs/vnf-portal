import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { APIs } from '../enums/api'
import { AuthSignInResponse } from '../types/auth'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient)

  isSignedIn() {
    const accessToken = localStorage.getItem('authorization')

    return !!accessToken
  }

  signIn(username: string, password: string) {
    return this.#http.post<AuthSignInResponse>(APIs.auth.signIn, { account: { username, password } })
  }
}
