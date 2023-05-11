import { Component, inject } from '@angular/core';
import { SessionManagerService } from 'src/app/services/session-manager.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public session = inject(SessionManagerService)
}
