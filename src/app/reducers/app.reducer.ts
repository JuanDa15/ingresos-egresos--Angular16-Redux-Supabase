import { ActionReducerMap } from "@ngrx/store";
import { UIReducer, UIState } from "./ui.reducer";
import { AuthReducer, AuthState } from "./auth.reducer";
// import { TransactionState, transactionReducer } from "./transaction.reducer";

export interface AppState {
  ui: UIState,
  auth: AuthState,
  // transactions: TransactionState
}

export const AppReducer: ActionReducerMap<AppState> = {
  ui: UIReducer,
  auth: AuthReducer,
  // transactions: transactionReducer
}
