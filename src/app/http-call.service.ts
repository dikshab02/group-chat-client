import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILogin } from './model/login-detail';

@Injectable({
  providedIn: 'root'
})
export class HttpCallService {
  private apiUrl = 'http://localhost:3000';

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

  deleteUser(userid: any){
    return this.http.delete<any>(`${this.apiUrl}/delete/${userid}`);
  }

}
