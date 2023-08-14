import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { isLoggedInService } from './isLoggedIn-route-guard';
import { isNotLoggedInService } from './isNotLoggedIn-route-guard';
import { AddUserComponent } from './add-user/add-user.component';
import { isAdminService } from './isAdmin-route-guard';
import { CreateChatGroupComponent } from './create-chat-group/create-chat-group.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [isNotLoggedInService]

  },
  {
    path: 'signup',
    component: SignupComponent,
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
  },
  {
    path: 'create-chat-group',
    component: CreateChatGroupComponent,
    canActivate: [isLoggedInService]
  },
  {
    path: '*',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
