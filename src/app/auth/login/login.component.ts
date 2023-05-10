import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private session = inject(SessionManagerService);
  public form = signal<FormGroup>(this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  }))

  public  async login(): Promise<void> {
    const { email, password } = this.form().value;
    this.auth.logIn({email, password})
  }
}
