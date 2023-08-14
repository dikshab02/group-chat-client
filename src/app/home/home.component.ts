import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from '../http-call.service';
import { ILogin } from '../model/login-detail';
import { IChatGroup } from '../model/chat-group';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  groupObj : IChatGroup[] | undefined;
  userObj: ILogin | undefined ;
  constructor(private router: Router,
    private httpCallService: HttpCallService){}

  ngOnInit(){
    let username = localStorage.getItem('loggedInUser');
    if(username)
    this.userObj = JSON.parse(username);
  console.log("userObj",this.userObj?._id)
  this.getChatGroups(this.userObj?._id);
  }

  userList() {
    this.router.navigate(['/getAll']);
  }

  getChatGroups(userId : any){
    this.httpCallService.getChatGroups(userId).subscribe(y=>{
      this.groupObj = y
      console.log("o",this.groupObj)
    }
    );
  }

}
