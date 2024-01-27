export type User = {
  id: string
  name: string
  email: string
  phone: string
  address: string
  role: string
  avatar: string
  accountId: string
}

export type SignInResponse = {
  success: boolean
  data: {
    accessToken: string
    user: User
  }
}

export type MeResponse = {
  success: boolean
  data: User
}
