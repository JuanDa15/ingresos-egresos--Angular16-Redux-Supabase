import { Component, inject } from '@angular/core';
import { SessionManagerService } from './services/session-manager.service';
import { AppState } from './reducers/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'redux-ingresos-egresos';
  public store: Store<AppState> = inject(Store)
  public uiStore$ = this.store.select(({ui}) => ui)
  public loading$ = this.uiStore$.pipe(map(({loading}) => loading));

  constructor(
    private session: SessionManagerService
  ){
    this.session.initializeSession();
  }
}
