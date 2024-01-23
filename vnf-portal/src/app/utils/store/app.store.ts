import { userReducer } from './reducer/user.reducer'

export const AppStore = {
  user: userReducer,
} as const
