import { Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers/app.reducer';
import { setLoading, stopLoading } from 'src/app/reducers/ui.actions';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  public fb = inject(FormBuilder)
  public location = inject(Location);
  public transactionsService = inject(TransactionsService)
  public store: Store<AppState> = inject(Store)

  public loading$ = this.store.select(({ ui }) => ui.loading )

  public form = signal<FormGroup>(this.fb.group({
    description: [null, Validators.required],
    amount: [null, Validators.required],
    type: [null, Validators.required],
  }))


  public async save() {
    if (this.form().invalid) return;
    this.store.dispatch( setLoading() )
    const resp = await this.transactionsService.createTransaction({...this.form().value})
    this.store.dispatch( stopLoading() )
    if (resp) {
      this.form().reset();
    }
  }
}
