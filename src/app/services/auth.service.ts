import { Injectable, inject } from '@angular/core';
import { AuthCredentials } from '../interfaces/auth-credentials.interface';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _db = inject(SupabaseService);


  public async signUp(credentials: AuthCredentials) {
    const {data: {session, user}, error} = await this._db.supabase.auth.signUp(credentials);
  }

  public async logIn(credentials: AuthCredentials) {
    const { data: {session, user}, error } = await this._db.supabase.auth.signInWithPassword(credentials);
  }
}
