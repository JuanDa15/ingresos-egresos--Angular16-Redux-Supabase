import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthError } from '@supabase/supabase-js';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';

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
    if(this.form().invalid) return;
    const { email, password } = this.form().value;
    this.auth.signUp({ email, password })
    .then(({data, error}) => {
      if (error) {
        this._manageErrors(error)
        return;
      }
      this.notifications.success('Register successfully')
      this.router.navigateByUrl('/dashboard')
    })
    .catch(e => {throw new Error(e)})
}

  private _manageErrors(error: AuthError) {
    this.notifications.error(`Error ${error.status}: ${error.cause}`)
  }
}
