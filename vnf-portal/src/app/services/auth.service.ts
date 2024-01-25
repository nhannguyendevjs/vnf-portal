import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { apis } from '../enums/api'
import { AuthSignInResponse } from '../types/auth'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient)

  signIn(username: string, password: string) {
    return this.http.post<AuthSignInResponse>(apis.auth.signIn, { account: { username, password } })
  }
}
