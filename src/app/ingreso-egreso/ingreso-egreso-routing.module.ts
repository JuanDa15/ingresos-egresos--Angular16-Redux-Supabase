import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { EstadisticaComponent } from "./estadistica/estadistica.component";
import { MainComponent } from "./main/main.component";
import { DetalleComponent } from "./detalle/detalle.component";

export const ROUTES: Routes =[
  { path: '', component: EstadisticaComponent },
  { path: 'ingreso-egreso', component: MainComponent },
  { path: 'detalle', component: DetalleComponent },

]

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class IngresoEgresoModuleRoutingModule { }
