import { Component, OnInit } from '@angular/core';
import { HttpCallService } from '../http-call.service';
import { ILogin } from '../model/login-detail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  users: ILogin[] = [];
  name: string = '';
  password: string = '';
  newName: string | null = '';

  constructor(private HttpCallService: HttpCallService, private router: Router) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.HttpCallService.getAll().subscribe((response) => {
      this.users = response;
    });
  }

  removeUser(userid: string) {
    this.HttpCallService
      .deleteUser(userid)
      .subscribe((del) => console.log('deleted', del));
    this.fetchUsers();
  }

  editUser(userid: string){
    this.newName = prompt();
    if(this.newName)
      this.HttpCallService.editUser(userid, this.newName).subscribe((res)=>{
        console.log("res->",res)
        this.fetchUsers();
      });
  }

  addUser() {
    const credentials = {
      name: this.name,
      password: this.password,
    };

    this.HttpCallService.signup(credentials).subscribe((response) => {
      this.router.navigate(['']);
      this.fetchUsers();
    });
  }
}
