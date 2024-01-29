import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { APIs } from '../enums/api'
import * as UserTypes from '../types/users'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  #http = inject(HttpClient)

  search() {
    return this.#http.post<UserTypes.SearchResponse>(APIs.users.search, {})
  }
}
