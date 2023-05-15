import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { Transaction } from 'src/app/interfaces/transaction.interface';
import { AppState } from 'src/app/reducers/app.reducer';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent {
  public store: Store<AppState> = inject(Store)
  public transaction = inject(TransactionsService)
  public data = this.store.select(({transactions}) => transactions.data).pipe(filter(item => item.length > 0))

  delete( item: Transaction ) {
    if(item.id == null) return;
    this.transaction.deleteTransaction(item.id)
  }
}
