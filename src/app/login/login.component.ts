import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from '../http-call.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // responseState: any;
  name: string = '';
  password: string = '';
  constructor(private router: Router,
    private httpCallService: HttpCallService){}

  ngOnInit(){}

  login(){

    const credentials ={
      name : this.name,
      password: this.password
    };

    this.httpCallService.login(credentials).subscribe(response => {
      localStorage.setItem('loggedInUser', JSON.stringify(response.data));
      this.httpCallService.loggedInUser = true;
      this.httpCallService.isAdmin = response.data.isAdmin ? true : false;
      this.router.navigate(['home']);
    })
  }

  signup(){
    this.router.navigate(['signup'])
  }

}
