import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { NotificationsService } from './notifications.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {
  private _user = signal<null | User>(null);
  private _userSubject$ = new BehaviorSubject<null | User>(this._user())
  public userObservable$ = this._userSubject$.asObservable();
  public db = inject(SupabaseService);
  public notification = inject(NotificationsService)

  set user(val: User | null) {
    this._user.set(val);
    this._userSubject$.next(this._user())
  }

  get user(): User | null {
    return this._user()
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
    this._user.set(user);
    this._userSubject$.next(user);
  }

  public async getSession() {
    const { data: {session}, error } =
        await this.db.supabase.auth.getSession()
    if (error) {
      this.notification.error(error.message);
      return null;
    }
    if (!session) {
      this.notification.error('No session exist');
    }

    return session;
  }

  public async signOut() {
    const { error } = await this.db.supabase.auth.signOut();
    if (error !== null) {
      this.notification.error(error.message)
      throw new Error(JSON.stringify(error));
    }
    return error;
  }

  public async initializeSession() {
    await this.updateUser();
  }

  public async refreshSession() {
    const currentSession = await this.getSession();
    if (currentSession) {

      const {data: { user }} = await this.db.supabase.auth.refreshSession({
        refresh_token: currentSession.refresh_token
      })

      this.user = user;
    }
  }
}
