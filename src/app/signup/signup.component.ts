import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from '../http-call.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  name: string = '';
  password: string = '';
  constructor(private router: Router, private HttpCallService: HttpCallService) {}

  ngOnInit() {}


  signup() {
    const credentials = {
      name: this.name,
      password: this.password,
    };

    this.HttpCallService.signup(credentials).subscribe(response => {
        console.log('Sign up:', response);
        this.router.navigate(['login']);
      }
    );
  }
}
