import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { DBUser } from 'src/app/interfaces/user.interface';
import { AppState } from 'src/app/reducers/app.reducer';
import { setUser } from 'src/app/reducers/auth.actions';
import { setLoading, stopLoading } from 'src/app/reducers/ui.actions';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public fb = inject(FormBuilder);
  public router = inject(Router)
  private auth = inject(AuthService);
  public notifications = inject(NotificationsService);
  public session = inject(SessionManagerService);
  public store: Store<AppState> = inject(Store)

  public form = signal<FormGroup>(this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  }))

  public async login(): Promise<void> {
    if (this.form().invalid) return;
    this.store.dispatch(setLoading());
    const { email, password } = this.form().value;
    this.auth.logIn({ email, password })
      .then(async (resp) => {
        (resp) && this._processResponse(resp);
        this.notifications.success('Login successfully')
        this._redirect(resp?.data?.pop()?.['uid'])
      })
      .catch(e => {
        this.store.dispatch(setUser({user: null}))
        this.store.dispatch(stopLoading());
        this.notifications.error(e)
      })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _processResponse({data, status, error}: PostgrestSingleResponse<any> ): void {
    if (status !== 200) {
      this.store.dispatch(setUser({user: null}));
      this.notifications.error(error?.message || '');
      return;
    }
    const user = data.pop();
    this.store.dispatch( setUser({
      user: user
    }));
  }

  private async _redirect(user: DBUser) {
    const hasPendingUpdateds = await this.session.hasUpdatedData();
    this.store.dispatch(stopLoading());
    (hasPendingUpdateds)
      ? this.router.navigate(['/dashboard'])
      : this.router.navigate(['/auth/update-data', user.uid]);
  }
}
