import { ActionReducerMap } from "@ngrx/store";
import { UIReducer, UIState } from "./ui.reducer";
import { AuthReducer, AuthState } from "./auth.reducer";

export interface AppState {
  ui: UIState,
  auth: AuthState
}

export const AppReducer: ActionReducerMap<AppState> = {
  ui: UIReducer,
  auth: AuthReducer
}
