import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from '../http-call.service';
import { ILogin } from '../model/login-detail';
import { IChatGroup } from '../model/chat-group';
import { IChatMessage } from '../model/chat-message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  groupObj: IChatGroup[] | undefined;
  userObj: ILogin | undefined;
  msg: string | undefined;
  constructor(
    private router: Router,
    private httpCallService: HttpCallService
  ) {}

  ngOnInit() {
    let username = localStorage.getItem('loggedInUser');
    if (username) this.userObj = JSON.parse(username);
    if(this.userObj?._id)
    this.getChatGroups(this.userObj._id);
  }

  userList() {
    this.router.navigate(['/getAll']);
  }

  getChatGroups(userId: string) {
    this.httpCallService.getChatGroups(userId).subscribe((y) => {
      this.groupObj = y;
    });
  }

  leaveGroup(obj: IChatGroup) {
    obj.users.forEach((user: ILogin) => {
      if(obj._id && user._id)
      this.httpCallService.leaveGroup(obj._id, user._id).subscribe(() => {
        if(user._id)
        this.getChatGroups(user._id);
      });
    });
  }

  deleteGroup(obj: IChatGroup) {
    obj.users.forEach((user: ILogin) => {
      if(obj._id)
      this.httpCallService.deleteGroup(obj._id).subscribe(() => {
        if(user._id)
        this.getChatGroups(user._id);
      });
    });
  }

  sendMessage(obj: IChatGroup){
    if(this.userObj && this.msg){
      let time = new Date();
        let messageObj = this.convertObj(obj, this.msg, this.userObj, time);
        this.httpCallService.sendMessage(messageObj).subscribe(res =>{
          console.log("res",res)
        })
    }

  }

  convertObj(obj: IChatGroup, msg:string, userObj: ILogin, time: Date){
      const tempObj: IChatMessage = {
        chatGrpId: obj._id? obj._id:'',
        user: userObj,
        time: time,
        message: msg,
      }
      return tempObj;
  }

  getChat(){
    // this.httpCallService.getChat().subscribe()
  }
}
