import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILogin } from './model/login-detail';
import { IChatGroup } from './model/chat-group';
import { IChatMessage } from './model/chat-message';

@Injectable({
  providedIn: 'root'
})
export class HttpCallService {
  private apiUrl = 'http://localhost:3000';
  loggedInUser: boolean = false;
  isAdmin: boolean = false;

  constructor(private http: HttpClient) { }

  login(credentials: {name: string, password: string}): Observable<ILogin>{
    return this.http.post<ILogin>(`${this.apiUrl}/login`, credentials)
  }

  signup(credentials: {name: string, password: string}): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/signup`, credentials);
  }

  getAll() {
    return this.http.get<any>(`${this.apiUrl}/getAll`);
  }

  deleteUser(userid: string){
    return this.http.delete<any>(`${this.apiUrl}/delete/${userid}`);
  }

  searchUser(username: string): Observable<ILogin[]> {
    return this.http.post<ILogin[]>(`${this.apiUrl}/search-user`, {name:username});
  }

  saveChatGroup(chatGroup: IChatGroup){
    return this.http.post<IChatGroup>(`${this.apiUrl}/create-chat-group`, {chatGroup: chatGroup});
  }

  getChatGroups(userid: string): Observable<IChatGroup[]> {
    return this.http.get<IChatGroup[]>(`${this.apiUrl}/groups/${userid}`);
  }

  leaveGroup(groupId: string, userId: string){
    return this.http.delete<any>(`${this.apiUrl}/groups/${groupId}/users/${userId}`)
  }

  deleteGroup(groupId: string) {
    return this.http.delete<any>(`${this.apiUrl}/groups/${groupId}`);
  }

  sendMessage(obj: IChatMessage){
    console.log("obj",obj)
    return this.http.post<IChatGroup>(`${this.apiUrl}/chat`, obj);
  }

  getChatMessage(groupId: string){
    return this.http.get<IChatMessage[]>(`${this.apiUrl}/message/${groupId}`);
  }

  getChatGroupDetails(groupId: string): Observable<IChatGroup> {
    return this.http.get<IChatGroup>(`${this.apiUrl}/group/${groupId}`);
  }

  editUser(userId: string, newName: string)  {
    return this.http.put<ILogin>(`${this.apiUrl}/users/${userId}`, {newName: newName});
  }

  updateGrpName(chatGroup: IChatGroup, groupId: string)  {
    return this.http.put<IChatGroup>(`${this.apiUrl}/group/${groupId}`, {chatGroup: chatGroup});
  }
}
