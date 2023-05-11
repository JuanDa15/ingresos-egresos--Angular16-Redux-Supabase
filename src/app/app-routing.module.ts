import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
import { MainComponent } from './ingreso-egreso/main/main.component';
import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [authGuard],
      children: [
        { path: '', component: EstadisticaComponent },
        { path: 'ingreso-egreso', component: MainComponent },
        { path: 'detalle', component: DetalleComponent },

      ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
