import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private _supabase = createClient(
    environment.DB_ENDPOINT,
    environment.DB_PUBLIC_KEY
  );

  get supabase() {
    return this._supabase;
  }
}
