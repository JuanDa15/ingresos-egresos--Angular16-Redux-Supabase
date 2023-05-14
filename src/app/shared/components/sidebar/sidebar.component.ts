import { Component, OnInit, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@supabase/supabase-js';
import { AppState } from 'src/app/reducers/app.reducer';
import { clearUser } from 'src/app/reducers/auth.actions';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public session = inject(SessionManagerService)
  public notifications = inject(NotificationsService)
  public store: Store<AppState> = inject(Store)
  public user$ = this.store.select(({auth}) => auth.user)

  public logOut() {
    this.session.signOut();
    this.notifications.success('Sign out success')
    this.store.dispatch(clearUser())
  }
}
