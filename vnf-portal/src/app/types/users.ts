export type User = {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

export type SearchResponse = {
  success: boolean
  data: User[]
}
