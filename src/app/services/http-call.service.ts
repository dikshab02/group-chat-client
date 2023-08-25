import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILogin } from '../model/login-detail';
import { IChatGroup } from '../model/chat-group';
import { IChatMessage } from '../model/chat-message';
import { ServerResponse } from '../model/server-response.model';

@Injectable({
  providedIn: 'root'
})
export class HttpCallService {
  private apiUrl = 'http://localhost:3000';
  loggedInUser: boolean = false;
  isAdmin: boolean = false;

  constructor(private http: HttpClient) { }

  login(credentials: {name: string, password: string}): Observable<ServerResponse<ILogin>>{
    return this.http.post<ServerResponse<ILogin>>(`${this.apiUrl}/login`, credentials)
  }

  signup(credentials: {name: string, password: string}): Observable<ServerResponse<string>> {
    return this.http.post<ServerResponse<string>>(`${this.apiUrl}/signup`, credentials);
  }

  getAll():Observable<ServerResponse<ILogin[]>> {
    return this.http.get<ServerResponse<ILogin[]>>(`${this.apiUrl}/getAll`);
  }

  deleteUser(userid: string):Observable<ServerResponse<string>> {
    return this.http.delete<ServerResponse<string>>(`${this.apiUrl}/delete/${userid}`);
  }

  searchUser(username: string):Observable<ServerResponse<ILogin[]>> {
    return this.http.post<ServerResponse<ILogin[]>>(`${this.apiUrl}/search-user`, {name:username});
  }

  saveChatGroup(chatGroup: IChatGroup):Observable<ServerResponse<string>>{
    return this.http.post<ServerResponse<string>>(`${this.apiUrl}/create-chat-group`, {chatGroup: chatGroup});
  }

  getChatGroups(userid: string):Observable<ServerResponse<IChatGroup[]>> {
    return this.http.get<ServerResponse<IChatGroup[]>>(`${this.apiUrl}/groups/${userid}`);
  }

  leaveGroup(groupId: string, userId: string):Observable<ServerResponse<string>> {
    return this.http.delete<ServerResponse<string>>(`${this.apiUrl}/groups/${groupId}/users/${userId}`)
  }

  deleteGroup(groupId: string):Observable<ServerResponse<string>> {
    return this.http.delete<ServerResponse<string>>(`${this.apiUrl}/groups/${groupId}`);
  }

  sendMessage(obj: IChatMessage):Observable<ServerResponse<IChatGroup>> {
    return this.http.post<ServerResponse<IChatGroup>>(`${this.apiUrl}/chat`, obj);
  }

  getChatMessage(groupId: string):Observable<ServerResponse<IChatMessage[]>> {
    return this.http.get<ServerResponse<IChatMessage[]>>(`${this.apiUrl}/message/${groupId}`);
  }

  getChatGroupDetails(groupId: string): Observable<ServerResponse<IChatGroup>> {
    return this.http.get<ServerResponse<IChatGroup>>(`${this.apiUrl}/group/${groupId}`);
  }

  editUser(userId: string, newName: string): Observable<ServerResponse<ILogin>>  {
    return this.http.put<ServerResponse<ILogin>>(`${this.apiUrl}/users/${userId}`, {newName: newName});
  }

  updateGrpDetails(chatGroup: IChatGroup, groupId: string): Observable<ServerResponse<string>>  {
    return this.http.put<ServerResponse<string>>(`${this.apiUrl}/group/${groupId}`, {chatGroup: chatGroup});
  }

  likeChatMessage(messageId: string, userId:string): Observable<ServerResponse<string>> {
    return this.http.put<ServerResponse<string>>(`${this.apiUrl}/message/like/${messageId}`,{userId: userId} );
  }

  logout(): Observable<ServerResponse<string>> {
    return this.http.get<ServerResponse<string>>(`${this.apiUrl}/logout`);
  }
}
