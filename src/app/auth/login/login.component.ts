import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthError } from '@supabase/supabase-js';
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

  public form = signal<FormGroup>(this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  }))

  public  async login(): Promise<void> {
    if(this.form().invalid)return;
    const { email, password } = this.form().value;
    this.auth.logIn({email, password})
      .then(async({data, error}) => {
        if (error) {
          this._manageErrors(error)
          return;
        }
        (data.user) && (this.session.user = data.user);
        this.notifications.success('Login successfully')

        const resp = await this.session.hasUpdatedData();

        (resp)
          ? this.router.navigate(['/dashboard'])
          : this.router.navigate(['/auth/update-data', data.user?.id]);
      })
      .catch(e => {throw new Error(e)})
  }

  private _manageErrors(error: AuthError) {
    this.notifications.error(`Error ${error.status}: ${error.message}`)
  }
}
