import { createAction } from "@ngrx/store";

export const setLoading = createAction(
  '[UI Actions] SET LOADING',
)

export const stopLoading = createAction(
  '[UI Actions] STOP LOADING',
)
