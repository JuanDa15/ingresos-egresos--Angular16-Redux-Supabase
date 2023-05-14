import { createAction, props } from "@ngrx/store";
import { DBUser } from "../interfaces/user.interface";

export const setUser = createAction(
  '[AUTH] SET USER',
  props<{ user: DBUser | null}>()
)

export const clearUser = createAction(
  '[AUTH] CLEAR USER'
)
