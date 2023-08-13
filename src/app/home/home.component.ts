import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from '../http-call.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username: string | null = '';
  constructor(private router: Router){}

  ngOnInit(){
    this.username = localStorage.getItem('loggedInUser')
  }

  userList() {
    this.router.navigate(['/getAll']);
  }

}
