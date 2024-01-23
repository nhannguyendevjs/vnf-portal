import { createAction } from '@ngrx/store'
import { actionFactory } from '../factories/action.factory'

export const setLoggedInUser = createAction('[User Logged In] Set', (user) => actionFactory<any>(user))
export const resetLoggedInUser = createAction('[User Logged In] Reset', () => actionFactory())
