import { Injectable, inject } from '@angular/core';
import { AuthCredentials } from '../interfaces/auth-credentials.interface';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _db = inject(SupabaseService);


  public async signUp(credentials: AuthCredentials) {
    return this._db.supabase.auth.signUp(credentials)
      .then(async({data, error}) => {
        await this._db.supabase.from('user_information').insert({
          uid: data.user?.id,
          names: null,
          last_names: null,
          email: credentials.email
        })
        return {data,error};
      })
  }

  public async logIn(credentials: AuthCredentials) {
    return this._db.supabase.auth.signInWithPassword(credentials);
  }
}
