import { userReducer } from './reducers/user.reducer'

export const AppStore = {
  user: userReducer,
} as const
