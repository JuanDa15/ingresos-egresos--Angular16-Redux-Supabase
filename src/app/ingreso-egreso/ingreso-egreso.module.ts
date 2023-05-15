import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { MainComponent } from './main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IngresoEgresoModuleRoutingModule } from './ingreso-egreso-routing.module';



@NgModule({
  declarations: [
    DetalleComponent,
    EstadisticaComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    IngresoEgresoModuleRoutingModule,
    ReactiveFormsModule
  ]
})
export class IngresoEgresoModule { }
