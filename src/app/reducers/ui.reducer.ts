import { createReducer, on } from "@ngrx/store"
import { setLoading, stopLoading } from "./ui.actions"

export interface UIState {
  loading: boolean
}

const initialState: UIState = {
  loading: false
}

export const UIReducer = createReducer(initialState,
  on(setLoading, (state: UIState): UIState => ({...state, loading: true})),
  on(stopLoading, (state: UIState): UIState => ({...state, loading: false}))
)
