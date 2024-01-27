import { createReducer, on } from '@ngrx/store'
import * as UserActions from '../actions/user.actions'

export const initialState = null

export const userReducer = createReducer(
  initialState,
  on(UserActions.setUser, (_actionType, action) => action.payload),
  on(UserActions.resetUser, () => null)
)
