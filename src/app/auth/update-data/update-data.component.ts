import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { UpdateDataService } from 'src/app/services/update-data.service';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss']
})
export class UpdateDataComponent implements OnInit{
  public ar = inject(ActivatedRoute);
  public fb = inject(FormBuilder);
  public router = inject(Router);
  public session = inject(SessionManagerService)
  public updateDataService = inject(UpdateDataService);
  public notifications = inject(NotificationsService);

  public loading = signal(false);
  public form  = signal<FormGroup>(this.fb.group({
    names: [null, [Validators.required]],
    last_names: [null, [Validators.required]],
    id: [null, [Validators.required]]
  }))

  ngOnInit(): void {
    this.ar.params.subscribe({
      next: ({id}) => {
        this.form().patchValue({
          id: id
        })
      }
    })
  }

  async signOut() {
    const currentSession = await this.session.signOut();
    (currentSession) && this.router.navigateByUrl('/auth/login');
  }

  updateData() {
    if (this.form().invalid) {
      this.notifications.error('Form is invalid')
      return;
    }
    this.loading.set(true);
    const {id, names, last_names} = this.form().value;

    this.updateDataService.updateData(
      names,
      last_names,
      id,
    ).then(() => {
      this.notifications.success('Information updated successfully');
      this.loading.set(false);
      this.router.navigateByUrl('/dashboard');
    })
  }
}
