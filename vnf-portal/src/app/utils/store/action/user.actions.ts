import { createAction } from '@ngrx/store'
import { actionFactory } from '../factory/action.factory'

export const setLoggedInUser = createAction('[User Logged In] Set', (user) => actionFactory<any>(user))
export const resetLoggedInUser = createAction('[User Logged In] Reset', () => actionFactory())
