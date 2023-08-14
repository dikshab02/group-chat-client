import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from './http-call.service';
import { ILogin } from './model/login-detail';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user:ILogin | undefined;
  title = 'new-app';
  isAdmin: boolean | undefined = false;


  constructor(
    private router: Router,
    public httpCallService: HttpCallService
  ) {}

  ngOnInit() {
    let userdetail = localStorage.getItem('loggedInUser');
    if (userdetail) this.user = JSON.parse(userdetail);
    if(this.user?.isAdmin)
      this.isAdmin = this.user?.isAdmin;
    if(localStorage.getItem('loggedInUser'))
    this.httpCallService.loggedInUser = true;
  }

  logout() {
    this.httpCallService.loggedInUser = false;
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }


}
