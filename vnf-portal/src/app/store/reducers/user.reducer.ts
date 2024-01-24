import { createReducer, on } from '@ngrx/store'
import * as UserActions from '../actions/user.actions'

export const initialState = { user: null }

export const userReducer = createReducer(
  initialState,
  on(UserActions.setLoggedInUser, (_actionType, action) => action.payload),
  on(UserActions.resetLoggedInUser, () => null)
)
