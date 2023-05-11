import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { NgModule } from "@angular/core";
import { UpdateDataComponent } from "./update-data/update-data.component";
import { updatedDataGuard } from "../guards/updated-data.guard";

export const ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'update-data/:id', component: UpdateDataComponent, canDeactivate:[ updatedDataGuard ]}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
