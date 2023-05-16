import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { MainComponent } from './main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IngresoEgresoModuleRoutingModule } from './ingreso-egreso-routing.module';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { CalcIncomesPipe } from '../pipes/calc-incomes.pipe';
import { ItemsQuantityPipe } from '../pipes/items-quantity.pipe';
import { CalcBalancePipe } from '../pipes/calc-balance.pipe';
import { NgChartsModule } from 'ng2-charts';
import { StoreModule } from '@ngrx/store';
import { transactionReducer } from '../reducers/transaction.reducer';



@NgModule({
  declarations: [
    DetalleComponent,
    EstadisticaComponent,
    MainComponent,
    OrderByPipe,
    CalcIncomesPipe,
    ItemsQuantityPipe,
    CalcBalancePipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('transactions', transactionReducer),
    IngresoEgresoModuleRoutingModule,
    ReactiveFormsModule,
    NgChartsModule
  ]
})
export class IngresoEgresoModule { }
