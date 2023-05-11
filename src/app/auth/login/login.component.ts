import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthError } from '@supabase/supabase-js';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public fb = inject(FormBuilder);
  public router = inject(Router)
  private auth = inject(AuthService);
  public form = signal<FormGroup>(this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  }))

  public  async login(): Promise<void> {
    if(this.form().invalid)return;
    const { email, password } = this.form().value;
    this.auth.logIn({email, password})
      .then(({data, error}) => {
        if (error) {
          this._manageErrors(error)
          return;
        }
        this.router.navigateByUrl('/dashboard')
      })
      .catch(e => {throw new Error(e)})
  }

  private _manageErrors(error: AuthError) {
    console.log(error)
  }
}
