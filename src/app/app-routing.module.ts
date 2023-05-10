import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
import { MainComponent } from './ingreso-egreso/main/main.component';
import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';

const routes: Routes = [

  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
  {
      path: '',
      component: DashboardComponent,
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
