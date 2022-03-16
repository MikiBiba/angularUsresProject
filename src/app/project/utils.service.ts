import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http : HttpClient) { }

  getUsers() {
     return this.http.get<User[]>("http://localhost:8002/api/users");
  }

  getUser(id : string) {
    return this.http.get<User>("http://localhost:8002/api/users/" + id);
  }

  updateUser(id : string, obj : User) {
    return this.http.put("http://localhost:8002/api/users/" + id, obj);
  }

  deleteUser(id : string) { 
    return this.http.delete("http://localhost:8002/api/users/" + id);
  }

  
}
