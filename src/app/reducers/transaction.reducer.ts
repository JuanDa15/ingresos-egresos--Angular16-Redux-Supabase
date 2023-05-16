import { createReducer, on } from "@ngrx/store";
import { Transaction } from "../interfaces/transaction.interface";
import { clearTransactions, setTransactions } from "./transaction.actions";
import { AppState } from "./app.reducer";

export interface TransactionState {
  data: Transaction[]
}

export interface AppStateWithTransaction extends AppState {
  transactions:  TransactionState;
}

const initialState: TransactionState = {
  data: []
};

export const transactionReducer = createReducer(
  initialState,
  on(setTransactions, (state, { data }) => {
    const newData = structuredClone(data);
    return {...state, data: newData}
  }),
  on(clearTransactions, (state) => {
    return {...structuredClone(state), data: []}
  })
)
