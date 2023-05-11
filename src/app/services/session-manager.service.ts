import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  public db = inject(SupabaseService);
  public notification = inject(NotificationsService)

  public async getUser() {
    const session = await this.getSession();
    if (session === null) {
      this.notification.error('No session exist')
      throw new Error('No session exist');
    }
    const { data: { user }} = await this.db.supabase.auth.getUser(session.access_token)
    return user;
  }

  public async getSession() {
    const { data: {session} } =
      await this.db.supabase.auth.getSession()
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
    const { error } = await this.db.supabase.auth.initialize();
    if (error !== null) {
      this.notification.error(error.message)
      throw new Error(JSON.stringify(error))
    }
  }
}
