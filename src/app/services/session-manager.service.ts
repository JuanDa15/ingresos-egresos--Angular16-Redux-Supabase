import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { NotificationsService } from './notifications.service';
import { Store } from '@ngrx/store';
import { setUser } from '../reducers/auth.actions';
import { DBUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {
  public db = inject(SupabaseService);
  public notification = inject(NotificationsService)
  public store = inject(Store);

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
