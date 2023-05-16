import { AfterViewInit, ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData } from 'chart.js';
import { Transaction } from 'src/app/interfaces/transaction.interface';
import { AppState } from 'src/app/reducers/app.reducer';
import { AppStateWithTransaction } from 'src/app/reducers/transaction.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit{
  public cd = inject(ChangeDetectorRef);

  public store: Store<AppStateWithTransaction> = inject(Store)
  public data = this.store.select(({transactions}) => transactions.data)
  public doughnutChartData = signal<ChartData<'doughnut'>>({
    labels: [ 'Incomes', 'Outcomes' ],
    datasets: [
      { data: [100,0] },
    ]
  });

  ngOnInit(): void {
    this.data.subscribe({
      next: (data) => {
        this.doughnutChartData().datasets = [ {data: [...this.calcDataSet(data)]}]
      }
    })
  }


  public calcDataSet(transactions: Transaction[]): number[] {
    const incomes = transactions.filter(item => item.type === 'income').map(({amount}) => amount).reduce((prev, curr) => prev += curr, 0)
    const outcomes = transactions.filter(item => item.type === 'outcome').map(({amount}) => amount).reduce((prev, curr) => prev += curr, 0)
    return [incomes, outcomes]
  }
}
