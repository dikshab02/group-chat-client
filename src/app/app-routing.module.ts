import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { isLoggedInService } from './isLoggedIn-route-guard';
import { isNotLoggedInService } from './isNotLoggedIn-route-guard';
import { AddUserComponent } from './add-user/add-user.component';
import { isAdminService } from './isAdmin-route-guard';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent,
    canActivate: [isNotLoggedInService]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [isNotLoggedInService]

  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [isLoggedInService]
  },
  {
    path: 'getAll',
    component: AddUserComponent,
    canActivate: [isAdminService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
