import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from './http-call.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'new-app';

  constructor(
    private router: Router,
    public httpCallService: HttpCallService
  ) {}

  ngOnInit() {
    if(localStorage.getItem('loggedInUser'))
    this.httpCallService.loggedInUser = true;
  }

  logout() {
    this.httpCallService.loggedInUser = false;
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
