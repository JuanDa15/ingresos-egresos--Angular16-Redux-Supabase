import { Component } from '@angular/core';
import { SessionManagerService } from './services/session-manager.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'redux-ingresos-egresos';
  constructor(
    private session: SessionManagerService
  ){
    this.session.initializeSession();
  }
}
