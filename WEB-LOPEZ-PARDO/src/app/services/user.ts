import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  api = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  register(data:any){
    return this.http.post(`${this.api}/register`, data);
  }

  login(data:any){
    return this.http.post(`${this.api}/login`, data);
  }

}