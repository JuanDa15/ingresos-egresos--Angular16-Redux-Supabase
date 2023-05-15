import { Injectable, OnDestroy, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { NotificationsService } from './notifications.service';
import { Store } from '@ngrx/store';
import { setUser } from '../reducers/auth.actions';
import { DBUser } from '../interfaces/user.interface';
import { AppState } from '../reducers/app.reducer';
import { Subscription } from 'rxjs';
import { clearTransactions } from '../reducers/transaction.actions';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService implements OnDestroy {
  public subscriptions = signal<Subscription[]>([])
  public user = signal<DBUser | null>(null);
  public db = inject(SupabaseService);
  public notification = inject(NotificationsService)
  public store: Store<AppState> = inject(Store);

  constructor() {
    const sub = this.store.select(({auth}) => auth.user).subscribe({
      next: (user) => this.user.set(user)
    })
    this.subscriptions().push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions().forEach(s => s.unsubscribe)
  }

  public async getUser() {
    const session = await this.getSession();
    if (session === null) { return }
    const { data: { user }} = await this.db.supabase.auth.getUser(session.access_token)
    return user;
  }

  public async updateUser() {
    const session = await this.getSession();
    if (session === null) { return }
    const { data: { user }} = await this.db.supabase.auth.getUser(session.access_token);
    const updatedUser = await this.db.supabase.from('user_information').select('*').eq('uid', user?.id);
    this.store.dispatch(setUser({
      user: (updatedUser.data?.pop() as DBUser) || null
    }))
  }

  public async getSession() {
    let sessionToReturn = null;
    const { data: {session}, error } = await this.db.supabase.auth.getSession();
    sessionToReturn = session;
    if (error) {
      this.notification.error(error.message);
      return null;
    }
    if (!session) {
      this.notification.error('No session exist');
      return null;
    }

    const refreshSession = await this.db.supabase.auth.refreshSession({
      refresh_token: session?.refresh_token
    });

    sessionToReturn = refreshSession.data.session;

    return sessionToReturn;
  }

  public async signOut() {
    const { error } = await this.db.supabase.auth.signOut();
    if (error !== null) {
      return false;
    }
    this.store.dispatch(clearTransactions())
    return true;
  }

  public async initializeSession() {
    await this.updateUser();
  }

  public async hasUpdatedData(): Promise<boolean> {
    const user = await this.getUser();
    const { data, error} = await this.db.supabase.from('user_information').select('updated').eq('uid', user?.id);
    if (error) {
      this.notification.error(error.message);
      return false
    }
    return data[0]['updated'];
  }
}
