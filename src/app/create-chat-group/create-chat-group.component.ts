import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ILogin } from '../model/login-detail';
import { HttpCallService } from '../http-call.service';
import { IChatGroup } from '../model/chat-group';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-chat-group',
  templateUrl: './create-chat-group.component.html',
  styleUrls: ['./create-chat-group.component.scss'],
})
export class CreateChatGroupComponent implements OnInit {
  userForm: FormGroup | undefined;
  selectedUserName: string | null = '';
  selectedUsers: ILogin[] = [];
  users: ILogin[] = [];

  constructor(
    private fb: FormBuilder,
    private httpcallService: HttpCallService,
    private router: Router
  ) {}

  ngOnInit() {
    const selectedUserName = localStorage.getItem('loggedInUser');
    if (selectedUserName) {
      this.selectedUsers.push(JSON.parse(selectedUserName));
      console.log('q->', this.selectedUsers);
    }

    this.userForm = this.fb.group({
      name: new FormControl(''),
      selectedUser: new FormControl<ILogin | string | undefined>(undefined),
    });
    this.subscribeForNameChange();
  }

  subscribeForNameChange() {
    this.userForm?.controls['selectedUser'].valueChanges.subscribe(
      (username) => {
        console.log('u', username);
        this.searchUser(username);
      }
    );
  }

  searchUser(name: string) {
    this.httpcallService.searchUser(name).subscribe((s) => {
      this.users = s;
    });
  }

  selectedValue(option: ILogin) {
    console.log('option', option);
    this.selectedUsers.push(option);
    this.userForm?.controls['selectedUser'].setValue('');
  }

  removeSelectedUser(id: any) {
    let removedUserIndex = this.selectedUsers.findIndex((u) => u._id === id);
    if (removedUserIndex >= 0) this.selectedUsers.splice(removedUserIndex);
  }

  saveSelectedUser() {
    const chatGroup: IChatGroup = {
      name: this.userForm?.controls['name'].value,
      users: this.selectedUsers,
    };
    this.httpcallService.saveChatGroup(chatGroup).subscribe((save) => {});
    this.router.navigate(['home']);
  }
}
