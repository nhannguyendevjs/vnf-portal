import { createReducer, on } from '@ngrx/store'
import * as UserActions from '../action/user.actions'

export const initialState = { user: null }

export const userReducer = createReducer(
  initialState,
  on(UserActions.setLoggedInUser, (actionType, action) => action.payload),
  on(UserActions.resetLoggedInUser, () => null)
)
