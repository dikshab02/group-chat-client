import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ILogin } from '../model/login-detail';
import { HttpCallService } from '../http-call.service';
import { IChatGroup } from '../model/chat-group';
import { ActivatedRoute, Router } from '@angular/router';

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
  grp_id: string | null | undefined;
  newGrpName: string | null | undefined;

  constructor(
    private fb: FormBuilder,
    private httpcallService: HttpCallService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.grp_id = this.route.snapshot.paramMap.get('groupId');

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
    this.loadChatGroup();
  }

  subscribeForNameChange() {
    this.userForm?.controls['selectedUser'].valueChanges.subscribe(
      (username) => {
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
    if (!this.grp_id) {
      this.httpcallService.saveChatGroup(chatGroup).subscribe((save) => {
        console.log('saved');
        this.router.navigate(['home']);
      });
    } else {
      this.httpcallService
        .updateGrpDetails(chatGroup, this.grp_id)
        .subscribe((updated) => {
          console.log('updated');
          this.router.navigate(['home']);
        });
    }
  }

  loadChatGroup() {
    if (!this.grp_id) return;

    this.httpcallService.getChatGroupDetails(this.grp_id).subscribe((res) => {
      this.userForm?.controls['name'].setValue(res.name);
      this.selectedUsers = res.users;
    });
  }
}
