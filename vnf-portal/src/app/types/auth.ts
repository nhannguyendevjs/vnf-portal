export type AuthUser = {
  id: string
  name: string
  email: string
  phone: string
  address: string
  role: string
  avatar: string
  accountId: string
}

export type AuthSignInResponse = {
  success: boolean
  data: {
    accessToken: string
    user: AuthUser
  }
}
