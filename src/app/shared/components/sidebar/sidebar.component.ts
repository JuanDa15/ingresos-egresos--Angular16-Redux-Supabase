import { Component, OnInit, inject, signal } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  public session = inject(SessionManagerService)
  public notifications = inject(NotificationsService)
  public user = signal<User | null>(null)

  ngOnInit(): void {
    this.session.userObservable$.subscribe({
      next: (val) => {
        this.user.set(val);
      }
    })
  }
}
