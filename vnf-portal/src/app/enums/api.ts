import { environment } from '../environments/environment'

const ROOT_URL = environment.apiUrl + '/api/' + environment.apiVersion

export const APIs = {
  auth: {
    signIn: ROOT_URL + '/auth/sign-in',
    me: ROOT_URL + '/auth/me',
  },
  users: {
    search: ROOT_URL + '/users/search',
  },
}
