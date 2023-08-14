import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from '../http-call.service';
import { ILogin } from '../model/login-detail';
import { IChatGroup } from '../model/chat-group';
import { IChatMessage } from '../model/chat-message';
import { IChatGroupMessage } from '../model/chat-group-message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  groupObj: IChatGroupMessage[] | undefined;
  userObj: ILogin | undefined;
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
      this.groupObj = [];
      for (let i=0; i < y.length; i++) {
        const newGroupMessageObj: IChatGroupMessage = {
          chatGroup: y[i],
          chatMessages: [],
          newMessage: ''
        }
        this.getChat(newGroupMessageObj);
        this.groupObj.push(newGroupMessageObj)
      }
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

  sendMessage(obj: IChatGroupMessage){
    if(this.userObj){
      let time = new Date();
        let messageObj = this.convertObj(obj.chatGroup, obj.newMessage, this.userObj, time);
        this.httpCallService.sendMessage(messageObj).subscribe(res =>{
          console.log("res",res);
          obj.newMessage = '';
          this.getChat(obj);
          
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

  getChat(chatGroupMessage: IChatGroupMessage){
    if (!chatGroupMessage.chatGroup._id) return;
    this.httpCallService.getChat(chatGroupMessage.chatGroup._id).subscribe((res)=>{
      chatGroupMessage.chatMessages = res;
    }

    )
  }
}
