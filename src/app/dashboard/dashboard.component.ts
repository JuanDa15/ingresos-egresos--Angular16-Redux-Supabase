import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public transactionsService = inject(TransactionsService)
  async ngOnInit() {
    await this.transactionsService.getTransactions()
    await this.transactionsService.subscribeToTransactions()
  }

  ngOnDestroy() {
    // this.transactionsService.cancelSubscription()
  }
}
