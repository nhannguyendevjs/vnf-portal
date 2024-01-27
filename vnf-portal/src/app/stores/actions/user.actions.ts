import { createAction } from '@ngrx/store'
import { actionFactory } from '../factories/action.factory'

export const setUser = createAction('[User] Set', (user) => actionFactory<any>(user))
export const resetUser = createAction('[User] Reset', () => actionFactory())
