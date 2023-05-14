import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateDataService {
  public bd = inject(SupabaseService);

  async updateData(names: string, last_names: string, id: string) {
    return this.bd.supabase.from('user_information')
      .update({ names, last_names, updated: true })
      .eq('uid', id).select().throwOnError();
  }
}
