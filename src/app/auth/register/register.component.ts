import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers/app.reducer';
import { setLoading, stopLoading } from 'src/app/reducers/ui.actions';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public fb = inject(FormBuilder);
  public auth = inject(AuthService);
  public router = inject(Router);
  public notifications = inject(NotificationsService);
  public session = inject(SessionManagerService);
  public store: Store<AppState> = inject(Store);

  public form = signal<FormGroup>(this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
    check_password: [null, [Validators.required]]
  }));

  get emailControl() {
    return this.form().get('email')
  }
  get passwordControl() {
    return this.form().get('password')
  }
  get checkPasswordControl() {
    return this.form().get('check_password')
  }

  public async createUser(): Promise<void> {
    if (this.form().invalid) return;
    this.store.dispatch(setLoading());
    const { email, password } = this.form().value;
    this.auth.signUp({ email, password })
      .then(async (resp) => {
        this.notifications.success('Register successfully');
        this._redirect();
      })
      .catch(e => {
        this.store.dispatch(stopLoading());
        this.notifications.error(e)
      })
  }

  private async _redirect() {
    const user = await this.session.getUser()
    this.store.dispatch(stopLoading());
    this.router.navigate(['/auth/update-data', user?.id]);
  }
}
