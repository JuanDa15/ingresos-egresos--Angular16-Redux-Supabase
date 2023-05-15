import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Transaction } from '../interfaces/transaction.interface';
import { SessionManagerService } from './session-manager.service';
import { NotificationsService } from './notifications.service';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers/app.reducer';
import { setTransactions } from '../reducers/transaction.actions';
import { RealtimeChannel } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  public transactionSubs!: RealtimeChannel;
  public session = inject(SessionManagerService)
  public db = inject(SupabaseService)
  public notifications = inject(NotificationsService)
  public store: Store<AppState> = inject(Store)

  async deleteTransaction(id: string) {
    const { data, error } = await this.db.supabase.from('income-outcome')
      .delete()
      .eq('id', id)

    console.log(data, error)
  }

  async createTransaction(transaction: Transaction) {
    const user = this.session.user();
    const { data, error } = await this.db.supabase.from('income-outcome')
      .insert({
        uid: user?.uid,
        created_at: new Date(),
        amount: transaction.amount,
        description: transaction.description,
        type: transaction.type
      }).select('*').throwOnError()

      if (error) {
        this.notifications.error(error.message);
        return false;
      }
      if (data && data.length > 0) {
        this.notifications.success(`${transaction.type} added successfully`)
      }
      return true;
  }

  async subscribeToTransactions() {
    const user = this.session.user();
    this.transactionSubs = this.db.supabase.channel('any')
      .on('postgres_changes', { event: '*', schema: '*', table: 'income-outcome', filter: `uid=eq.${user?.uid}` }, async() => {
        console.log('updated');
        await this.getTransactions();
      }).subscribe()
  }

  cancelSubscription() {
    this.transactionSubs.unsubscribe();
  }

  async getTransactions() {
    const user = this.session.user();

    const {data, error} = await this.db.supabase.from('income-outcome')
      .select('*').eq('uid', user?.uid).throwOnError()

    if (error) {
      this.notifications.error(error.message);
    }

    if (data && data.length > 0) {
      this.store.dispatch( setTransactions({
        data: data as Transaction[]
      }))
    }
  }
}
