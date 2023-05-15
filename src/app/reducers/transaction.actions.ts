import { createAction, props } from "@ngrx/store";
import { Transaction } from "../interfaces/transaction.interface";

export const setTransactions = createAction('[Transaction] Set transactions', props<{data: Transaction[]}>())

export const clearTransactions = createAction('[Transaction] Clear transactions')
