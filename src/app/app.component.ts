import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'new-app';

  constructor(private router: Router) {}

  logout(){
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
