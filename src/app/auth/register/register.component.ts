import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public fb = inject(FormBuilder);
  public auth = inject(AuthService);
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
    const { email, password } = this.form().value;
    await this.auth.signUp({ email, password })
  }
}
